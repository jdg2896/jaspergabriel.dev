---
title: "Step-by-Step Guide: Setting Up CI/CD for AWS SAM Applications with GitHub Actions"
description: "How to set up GitHub Actions CI/CD for AWS SAM serverless apps with IAM roles and automated multi-environment deployments."
pubDate: 2023-04-28
tags: ["tech", "aws", "devops"]
originalUrl: "https://dev.to/jdg2896/step-by-step-guide-setting-up-cicd-for-aws-sam-applications-with-github-actions-1869"
---

## Introduction

Over the years, the adoption of serverless applications has increased significantly. This has enabled startups to iterate more quickly by deploying proof of concepts and code without having to handle much of the cloud infrastructure. Additionally, serverless applications can help reduce costs because you only pay for the resources you use, rather than paying a fixed cost for running cloud resources 24/7.

While serverless applications have enabled startups to move fast, in order to implement new features and changes with confidence, another essential component is [CI/CD](https://www.redhat.com/en/topics/devops/what-is-ci-cd) (continuous integration/continuous delivery). This enables development teams to automate certain parts of the deployment process and implement safeguards such as mandating that changes pass unit tests before they can be deployed to the cloud.

## Before We Start...

In this tutorial, we'll be using [AWS SAM](https://aws.amazon.com/serverless/sam/), which is AWS's open-source framework for building serverless applications for our sample application.

For the CI/CD tool, we'll be using [GitHub Actions](https://github.com/features/actions), which makes setting up our CI/CD pipeline simpler especially if we're already using GitHub to host our repositories.

This tutorial will also use my sample AWS SAM application using Node.js and TypeScript which I'll share. It uses git submodules as Lambda layers, and is configured to deploy to 3 environments (develop, staging, production).

So without further ado, let's get right on it!

## Setting up our AWS SAM Application.

Here's the sample [AWS SAM Application](https://github.com/jdg2896/aws-sam-template-node-ts) using Node.js and TypeScript for the purposes of demonstration.

Feel free to clone/fork the repo and set it up for yourself. Setup instructions are in the README file.

Otherwise you can also review the source code, which also contains the GitHub Actions workflow YAML file.

> **NOTE:** If you already have your own AWS SAM application written in JavaScript/TypeScript, or you're using another language such as Python, feel free to skip this part and proceed to the GitHub Actions setup.

## Setting up GitHub Actions for AWS SAM

### Step 1: Configuring AWS IAM Role for GitHub Actions

Before we can configure GitHub Actions to our repo, first we will need an AWS IAM Role to provide the necessary permissions needed for GitHub Actions to successfully deploy our AWS SAM application.

> **NOTE:** Although we can also use an IAM User for this, Oleksii Bebych from Automat-IT has a really nice [article about using GitHub Actions with AWS IAM roles](https://www.automat-it.com/post/using-github-actions-with-aws-iam-roles) suggesting that we should use IAM roles for applications and services as outlined in AWS's security best practices in IAM.
>
> While making this blog post, I also saw a recent [article on using IAM roles for GitHub Actions](https://aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/) made by David Rowe from AWS.

#### Add AWS IAM Identity Provider

1. First in the AWS console, go to **IAM**.

   ![AWS console IAM](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5m0oy8rmyc5ndx8uqt2l.png)

2. Next, go to **Identity providers**, then click **Add provider**.

   ![AWS console IAM add identity provider](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w99tzh3q0erfl59k9gp1.png)

3. Then let's configure the identity provider. Use the following configs below.
   - For the **Provider type**, choose **OpenID Connect**.
   - Then for the **Provider URL**, use **[https://token.actions.githubusercontent.com](https://token.actions.githubusercontent.com/)**.
   - Lastly, for the **Audience**, use **[sts.amazonaws.com](http://sts.amazonaws.com/)**.

   ![AWS console IAM configure identity provider](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q4fjw1y6nqowopp0w9b9.png)

4. Optionally, we can also click **Get Thumbprint** besides the **Provider URL** field to verify the certificate of the OIDC provider.

   Then once you're done reviewing, click **Add provider**.

   ![AWS console IAM save identity provider](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8q5mv6kx0i0wzzab23fi.png)

#### Add AWS IAM Role for GitHub Actions

1. Go to **Roles** while still in the IAM page in AWS console, then click **Create role**.

   ![AWS console IAM create role](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ppzstx7ft8ki15d448km.png)

2. Then, choose **Web Identity** for the **Trusted entity type**.

3. Choose the **Identity provider** and **Audience** we created earlier, which is **[token.actions.githubusercontent.com](http://token.actions.githubusercontent.com/)** and **[sts.amazonaws.com](http://sts.amazonaws.com/)** respectively.

   ![AWS console IAM role select trusted entity type](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/knws6xr4i3ycfiy6pfmz.png)

4. Then, let's choose the permissions needed to deploy our AWS SAM application with GitHub Actions.

   If you're using my AWS SAM sample project, then these are the permissions needed.
   - AWSCloudFormationFullAccess
   - IAMFullAccess
   - AmazonS3FullAccess
   - AWSLambda_FullAccess
   - AmazonAPIGatewayAdministrator
   - AmazonDynamoDBFullAccess

   > **NOTE:** Your permissions may vary depending on the resources your AWS SAM application uses. For example if you're also using SQS and SNS, then you'll need to add permissions for those, vice versa.

   Then click **Next**.

   ![AWS console IAM add role permissions](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p3uilwvr9gb38hum1p0x.png)

5. Then add a **Role name** and **Description**. The changes should look similar below.

   Once you're done reviewing the changes, click **Create role**.

   ![AWS console IAM role details](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a5r30uqjq9q7aiu1g19m.png)![AWS console IAM role review permissions](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mtjfl9ihtsgixv1k9w09.png)

   Now we've created our IAM role for GitHub actions, but we're not quite done yet. We'll also need to configure the trust policy in our newly created IAM role.

   We will be updating our policy to restrict our IAM role so that it will only allow deployments triggered from our own GitHub repository and branches.

#### Configure AWS IAM Role Trust Policy

1. First, go to **Roles**, then select our newly created IAM role **GitHubActionsRole** (or whatever role name you chose).

   ![AWS console IAM role select](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/13n0kcxrv8hq8uuk7gmb.png)

2. Next, go to **Trust relationships**, then click **Edit trust policy**.

   ![AWS console IAM role edit trust policy](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/76fx5tj1785d193g6hs1.png)

3. Now your trust policy should look something like this.

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": "sts:AssumeRoleWithWebIdentity",
         "Principal": {
           "Federated": "arn:aws:iam::499202726088:oidc-provider/token.actions.githubusercontent.com"
         },
         "Condition": {
           "StringEquals": {
             "token.actions.githubusercontent.com:aud": ["sts.amazonaws.com"]
           }
         }
       }
     ]
   }
   ```

   Let's update the trust policy with the following. Use **your own** IAM role ARN and GitHub repository/branches.

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Federated": "arn:aws:iam::499202726088:oidc-provider/token.actions.githubusercontent.com"
         },
         "Action": "sts:AssumeRoleWithWebIdentity",
         "Condition": {
           "StringEquals": {
             "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
             "token.actions.githubusercontent.com:sub": [
               "repo:jdg2896/aws-sam-template-node-ts:ref:refs/heads/develop",
               "repo:jdg2896/aws-sam-template-node-ts:ref:refs/heads/staging",
               "repo:jdg2896/aws-sam-template-node-ts:ref:refs/heads/production"
             ]
           }
         }
       }
     ]
   }
   ```

   After making the changes, click **Update policy**.

   ![AWS console IAM role update trust policy](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4rzg06s7uliuhxzoc2no.png)

   This policy change ensures that our IAM role can only be triggered from repositories and branches that we specify.

   Now we've configured our IAM role's trust policy, we will now need the IAM role ARN for configuring GitHub actions next, so let's copy it now.

   ![Copy GitHub Actions IAM role ARN](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/k7wgaplzpedmfjqpziih.png)

### Step 2: Adding a GitHub Workflow YAML file

In order to configure GitHub Actions in our repository, first we will need to create a [workflow](https://docs.github.com/en/actions/using-workflows/about-workflows) by adding a YAML file in our source code.

1.  In your GitHub repository, click **Actions**, then click **setup a workflow yourself**.

    ![GitHub Actions setup workflow](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kpm0jo6pucq1fheoiith.png)

2.  Copy the GitHub Actions workflow YAML file contents, like in the example below. Then update with the IAM role ARN we copied earlier.

    ```yaml
    on:
      push:
        branches:
          - develop
          - staging
          - production

    env:
      BRANCH_NAME: ${{ github.head_ref || github.ref_name }}
      AWS_REGION: ap-southeast-1

    permissions:
      id-token: write
      contents: read

    jobs:
      build-deploy:
        runs-on: ubuntu-latest
        steps:
          # Checkout with submodules
          - uses: actions/checkout@v3
            with:
              submodules: recursive
          # Setup Node.js, feel free to modify with your specific language
          - uses: actions/setup-node@v3
          # Configure AWS SAM CLI and AWS Credentials
          - uses: aws-actions/setup-sam@v2
          - uses: aws-actions/configure-aws-credentials@v2
            with:
              role-to-assume: arn:aws:iam::499202726088:role/GitHubActionsRole
              role-session-name: aws-sam-template-node-ts-github-actions
              aws-region: ${{ env.AWS_REGION }}
          # sam build
          - run: sam build
          # Run unit tests
          - name: Install npm modules
            run: npm install
          - name: Run tests
            run: yarn test
          # sam deploy
          - run: sam deploy --no-fail-on-empty-changeset --stack-name stack-name-${{ env.BRANCH_NAME }} --config-env ${{ env.BRANCH_NAME }} --parameter-overrides Environment=${{ env.BRANCH_NAME }}
    ```

    > **NOTE:** In this example file, I've configured GitHub actions to trigger on 3 specific branches emulating a [Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow):

           - develop
           - staging
           - production

    > Feel free to update the following to fit your use case:

            - Branches that can trigger GitHub actions
            - Whether you're using git submodules or not
            - Unit test commands
            - SAM CLI commands (`sam deploy`, etc.)

    >

    Then click **Start commit** and commit the changes.

    ![GitHub Actions commit workflow YAML file](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wnp6xhokt8y4eou4uq60.png)

### Testing GitHub Actions

Now that we've finally configured GitHub Actions to deploy to AWS every time we push changes, we can test it out by pushing any changes to the repository and branch we configured earlier.

![Test GitHub Actions](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t43ohucb6y3l60kf60q7.png)

## Conclusion

To summarize what we did to setup GitHub Actions for our AWS SAM application, we created and configured the following:

- IAM Identity Provider for GitHub Actions
- IAM role for GitHub Actions
- IAM role trust policy allow specific repo/branch
- GitHub Actions Workflow file

If you've made it this far, hopefully you were able to follow along and have now learned to setup GitHub Actions as our CI/CD tool for our AWS SAM applications.

There are also other options for other CI/CD tools, most notably AWS CodePipeline + CodeBuild. Paul Swail made a really nice article on [why he switched from AWS CodePipeline to GitHub Actions](https://serverlessfirst.com/switch-codepipeline-to-github-actions/), that's why I leaned towards learning GitHub Actions first.

If you have any feedback, feel free to comment. As this is my first time writing a blog post, there's probably some rough edges here and there.

I'm also available through my email at jasper.d.gabriel@gmail.com, [X](https://x.com/jdg2896), [LinkedIn](https://www.linkedin.com/in/jaspergabriel/), and [GitHub](https://github.com/jdg2896).

Thank you for reading and cheers!

## References

If you want to learn more, here are some resources that helped me in learning and setting up GitHub Actions for AWS SAM applications.

- [Using GitHub Actions to deploy serverless applications](https://aws.amazon.com/blogs/compute/using-github-actions-to-deploy-serverless-applications/)
- [Using GitHub Actions with AWS IAM roles](https://www.automat-it.com/post/using-github-actions-with-aws-iam-roles)
- [Use IAM roles to connect GitHub Actions to actions in AWS](https://aws.amazon.com/blogs/security/use-iam-roles-to-connect-github-actions-to-actions-in-aws/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub Actions Repositories](https://github.com/actions)
- [AWS for GitHub Actions Repositories](https://github.com/aws-actions)
