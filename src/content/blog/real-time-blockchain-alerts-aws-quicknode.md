---
title: "How to Create Real-Time Alerts for Blockchain Events with AWS and QuickNode"
description: "Create real-time blockchain event notifications using AWS Lambda webhooks and QuickNode alerts for Ethereum transactions."
pubDate: 2023-12-23
tags: ["tech", "blockchain", "aws"]
originalUrl: "https://dev.to/kshyun28/how-to-create-real-time-alerts-for-blockchain-events-with-aws-and-quicknode-23oe"
---


Blockchains have revolutionized how we store data by introducing the concept of immutable records. This feature allowed [Ethereum](https://ethereum.org/en/) and other blockchains to create [smart contracts](https://ethereum.org/en/developers/docs/smart-contracts/), which are code that can't be changed. Smart contracts ensured that conditions always execute in the same way, which enabled [decentralized applications](https://en.wikipedia.org/wiki/Decentralized_application). 

One downside of blockchains is that transactions **take time to process**. This is the price of guaranteeing the **security** and **immutability** of records. Knowing that blockchains will take time to process transactions, it is important to have real-time updates, especially for **customer-facing applications**.

In this article, I'll show you how to create real-time alerts for blockchain events with [AWS](https://aws.amazon.com/) and [QuickNode](https://www.quicknode.com/). 

## What to expect

To give a brief overview, you'll deploy **AWS infrastructure** with [AWS SAM](https://aws.amazon.com/serverless/sam/), which consists of a webhook that sends email alerts.

Then you'll create a **QuickAlert notification** on [Ethereum](https://ethereum.org/en/) mainnet.

Once both are deployed, you will receive an email whenever there are transfers of at least 1 million [USDT](https://tether.to/en/) or [USDC](https://www.circle.com/en/usdc).

Here's a high-level diagram on how QuickAlert notifications work.

![QuickAlerts high-level diagram](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243018/QuickAlerts/quickalerts-high-level-diagram_bcejb1.png)

> **Note:** QuickNode only support webhooks as of writing. In the future, they will support email alerts which will make this solution unnecessary.
>
> Though the solution that I'll give you is flexible since we'll be using a Lambda function, which you can customize to fit your own use cases.

## Before we start

To follow along with this guide, make sure you have:

- An [AWS Account](https://repost.aws/knowledge-center/create-and-activate-aws-account)
- A [QuickNode Account](https://www.quicknode.com?tap_a=67226-09396e&tap_s=4357026-faa3ca&utm_source=affiliate&utm_campaign=generic&utm_content=affiliate_landing_page&utm_medium=generic)

Then knowledge of the following is helpful:

- [AWS SAM](https://aws.amazon.com/serverless/sam/)
- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Blockchains](https://en.wikipedia.org/wiki/Blockchain) and [Ethereum](https://ethereum.org/en/)
- [Smart Contracts](https://ethereum.org/en/developers/docs/smart-contracts/)

With that out of the way, let's continue.

## Creating a webhook with AWS Lambda and SNS

### Setting up and configuring AWS SAM CLI

Before proceeding, make sure to [setup](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html) and [configure](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/using-sam-cli-configure.html) AWS SAM CLI.

Then verify that you have installed AWS SAM CLI by running `sam --version` on your terminal.

```
SAM CLI, version 1.105.0
```

After you've verified AWS SAM CLI, it's time to create your webhook with AWS.

### Deploying the sample application

I have provided a sample application in [GitHub](https://github.com/kshyun28/aws-lambda-sns-poc) to help you get started.

The application uses [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html) to deploy the following resources:

- [Amazon API Gateway](https://aws.amazon.com/api-gateway/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Amazon SNS](https://aws.amazon.com/sns/)

![AWS high-level diagram](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243017/QuickAlerts/aws-high-level-diagram_zyof1l.png)

Then to setup the project:

1. Clone the [sample application](https://github.com/kshyun28/aws-lambda-sns-poc).
2. Install Node.js dependencies by running `npm install`.
3. Add your email to the SNS Topic subscription in the `template.yaml` file.
    ```yaml
    Resources:
      SnsTopic:
        Type: AWS::SNS::Topic
        Properties:
          TopicName: SnsTopicEmailAlert
          DisplayName: SnsTopicEmailAlert
          Subscription:
            - Endpoint: <YOUR EMAIL HERE>
              Protocol: email
    ```
4. Build the application by running `sam build`.
5. Deploy the application by running `sam deploy`.

You should be prompted to deploy the changeset, enter `y` to proceed.

```
Previewing CloudFormation changeset before deployment
======================================================
Deploy this changeset? [y/N]:
```

If the deployment is successful, you should see something like this.

```
CloudFormation outputs from deployed stack
-------------------------------------------------------------------------------------------------
Outputs
-------------------------------------------------------------------------------------------------
Key                 WebEndpoint
Description         API Gateway endpoint URL for Prod stage
Value               https://<redacted>.execute-api.ap-southeast-1.amazonaws.com/Prod/
-------------------------------------------------------------------------------------------------

Successfully created/updated stack - aws-lambda-sns-poc in ap-southeast-1
```

**Copy the endpoint** shown in the output. This will be the webhook URL for your QuickAlert notification later.

> **Note:** You can test your webhook with [Postman](https://www.postman.com/) or other API testing tools to make sure it is working.

## Creating a QuickAlert notification

Now that you've successfully created a webhook, it's time to create a QuickAlert notification.

Register for a [free QuickNode account](https://www.quicknode.com?tap_a=67226-09396e&tap_s=4357026-faa3ca&utm_source=affiliate&utm_campaign=generic&utm_content=affiliate_landing_page&utm_medium=generic) if you haven't done so already.

Once you have an account, here are the steps for creating your QuickAlert notification.

1. Select **QuickAlerts** on the left sidebar, then click **Create QuickAlert**.

    ![QuickNode QuickAlerts Dashboard](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243017/QuickAlerts/1-quickalerts-dashboard_u8ig5r.png)

2. Configure the following:
    - Name your notification to **My QuickAlert** or any name you like.
    - Select **Ethereum** and **Mainnet** for chain and network.
    - Select **Blank Template**.

    Then click **Next** to proceed.

    ![Configuring the QuickAlert notification name, chain, network, and template](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243017/QuickAlerts/2-create-quickalert_an6qoa.png)

3. Before continuing, you need to get a **block number** to test your QuickAlert expression.

    Go to [Etherscan](https://etherscan.io/advanced-filter?tkn=0xdac17f958d2ee523a2206206994597c13d831ec7&txntype=2&amt=1000000%7e100000000) and choose any transaction you'd like to test.

    ![Finding 1 million USDT and above transfer transactions on Etherscan](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243019/QuickAlerts/3-select-transaction_dv6u9h.png)

4. Once you've chosen a transaction, copy the **block number**.

    ![USDT transfer transaction details on Etherscan](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243019/QuickAlerts/4-get-block-number_ykhc65.png)

5. After you've copied the block number:
    - Paste it on the **Target Block**.
    - Then click **Get Data**.

    ![Create QuickAlert expression](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243019/QuickAlerts/5-update-target-block_kbstul.png)

6. I've created a [sample expression](https://github.com/quiknode-labs/quickalerts-examples/pull/5) to filter out transfers of at least 1 million USDT or USDC.

    Copy this expression and paste it into the **Create Expression** field.
        
    ```ts
    (
      tx_logs_address == '0xdac17f958d2ee523a2206206994597c13d831ec7' ||
      tx_logs_address == '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
    ) &&
    tx_logs_topic0 == '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' &&
    tx_logs_topic1 =~ '^0x[0]{24}[a-fa-f0-9]{40}$' &&
    tx_logs_topic2 =~ '^0x[0]{24}[a-fa-f0-9]{40}$' &&
    tx_logs_topic3 == '' &&
    tx_logs_data_int >= 1000000000000
    ```

    Then click **Test Expression**.
  
    > **Note:** You should see your block number in the **Blocks tested against** section. 
    >
    > If there's a **check mark**, it means that your QuickAlert expression is working.

    After testing the expression, click **Next** to proceed.

    ![Test QuickAlert expression](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243019/QuickAlerts/6-test-expression_zdfdkt.png)

7. Now to create a Destination, click **Create Destination**.

    ![Create QuickAlert Destination](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243019/QuickAlerts/7-create-destination_ajwsjb.png)

8. Select **Webhook**, then click **Continue**.

    ![Select Webhook as destination type](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243019/QuickAlerts/8-select-webhook_ar8tnq.png)

9. Configure the following for your webhook:
      - Webhook name to **My Webhook** or any name you prefer.
      - Paste your **webhook** from earlier to the URL field.
      - Select **POST** for the request type.
      - Select **5 - Matched Receipts** for the payload type.

    Then Click **Create Webhook**.

    ![Configure webhook name, URL, request type, and payload type](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243019/QuickAlerts/9-create-webhook_kbi3yu.png)

10.  Click the **slider** on the right to enable your webhook.

    Then click **Deploy Notification**.

    ![Deploy QuickAlert notification](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243019/QuickAlerts/10-deploy-notification_livdj2.png)

## Testing the QuickAlert Notification

Now that you've created a QuickAlert notification, wait for it to deliver an alert. It usually takes a **few seconds up to a few minutes** depending on your filter expressions.

After waiting, refresh the page. 

You should see changes to the **Last delivery**, which shows the time since the last notification was triggered.

Then **click anywhere** on your QuickAlert notification to view the settings.

![Select created QuickAlert](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243020/QuickAlerts/11-view-notification_eezrdz.png)

Here, you can edit the following:

- Notification Name
- Expression
- Destinations

**Scroll down** to the bottom of the page to see the events.

![QuickAlert notification settings](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243020/QuickAlerts/12-notification-settings_zojvdy.png)

Once you're at the bottom of the page, you should see the **Events** section.

This shows all the blockchain events sent by your QuickAlert notification to your webhook.

![QuickAlert notification sent events](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243020/QuickAlerts/13-view-events_ro8fbh.png)

### Checking your email for alerts

Now, check the email you've configured earlier to see if you've received any emails.

You should see something similar.

![Email alert from SNS](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243020/QuickAlerts/14-view-email_yuhfjq.png)

Then click the **Etherscan link** to view the transaction.

You should see **at least 1 million USDT or USDC** was transferred.

![Transaction details from email alert](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243018/QuickAlerts/15-view-transaction_tyabnl.png)

After you're done testing, don't forget to **disable** or **delete** your QuickAlert notification to avoid wasting your credits.

![Disable or delete QuickAlert notification](https://res.cloudinary.com/dlieqpdfd/image/upload/v1703243017/QuickAlerts/16-disable-or-delete-notification_rzaode.png)

## Conclusion

To recap, you've successfully created a QuickAlert notification that sends an email whenever there are transfers of at least 1 million USDT or USDC.

I hope this can help you with integrating real-time blockchain event notifications into your applications.

Thank you for reading and if you have any questions or feedback, feel free to comment or connect with me [here](https://linktr.ee/kshyun28). 

## Resources
- [Sample Application: aws-lambda-sns-poc](https://github.com/kshyun28/aws-lambda-sns-poc)
- [AWS](https://aws.amazon.com/)
- [Amazon API Gateway](https://aws.amazon.com/api-gateway/)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- [Amazon SNS](https://aws.amazon.com/sns/)
- [AWS SAM](https://aws.amazon.com/serverless/sam/)
- [QuickNode](https://www.quicknode.com/)
- [QuickAlerts](https://www.quicknode.com/guides/quicknode-products/quickalerts/an-overview-of-quicknodes-quickalerts)
- [Ethereum](https://ethereum.org/en/)
- [Smart Contracts](https://ethereum.org/en/developers/docs/smart-contracts/)
