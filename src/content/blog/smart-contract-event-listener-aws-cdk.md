---
title: "How to Implement and Deploy a Smart Contract Event Listener with AWS CDK"
description: "Deploy Ethereum smart contract event listeners to AWS using CDK, with WebSocket connections and CloudWatch logging."
pubDate: 2023-11-20
tags: ["tech", "blockchain", "aws"]
originalUrl: "https://dev.to/jdg2896/how-to-implement-and-deploy-a-smart-contract-event-listener-with-aws-cdk-b1"
---


## Introduction

When you think of blockchain technologies, Ethereum, and smart contracts come to mind. Ethereum is one of the leading decentralized blockchains that pioneered smart contracts, which are programmable contracts that automatically execute the contract's terms. 

A powerful feature of smart contracts is their ability to emit events after successful transactions. For example, a `Transfer` event is emitted when a cryptocurrency like USDT is transferred from one person to another. This feature opens up a lot of possibilities for developers, such as implementing real-time updates into their applications.

This tutorial will guide you through setting up a smart contract event listener for Ethereum's USDT contract. You'll also learn to deploy the smart contract event listener to AWS using AWS CDK. After that, I'll share my personal experiences in using a smart contract event listener.

## Before starting

This guide assumes that you're familiar with:
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [TypeScript](https://www.typescriptlang.org/), and [Node.js](https://nodejs.org/en/)
- [Ethereum](https://ethereum.org/en/) and [Smart Contracts](https://ethereum.org/en/developers/docs/smart-contracts/)

Then you should be familiar with [AWS](https://aws.amazon.com/?nc2=h_lg) resources and already have an AWS account. 

If not, then you can follow this [guide](https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-creating.html) on setting up your AWS account. 

Knowledge of the following is helpful, but not required:
- [AWS CLI](https://aws.amazon.com/cli/)
- [AWS CDK](https://aws.amazon.com/cdk/)
- [Web3.js](https://web3js.org/)
- [WebSockets](https://ethereum.org/en/developers/tutorials/using-websockets/)
- [Docker](https://docs.docker.com/)

With that out of the way, let's start with setting up the smart contract event listener.

## Setting up the smart contract event listener

Before we start, make sure to check or clone the [sample repository](https://github.com/jdg2896/smart-contract-event-listener), which contains all the necessary code and files for the smart contract event listener. We'll refer to this repository throughout the guide.

By the end of this section, you'll have a working smart contract event listener that is ready for deployment. 

Let's get started!

## Setting up the environment variables

To listen to smart contract events, you'll first need to configure two environment variables:
- WebSocket endpoint
- Contract address

### Getting the WebSocket endpoint

For this guide, we'll use a WebSocket endpoint from Alchemy, which looks like `wss://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>`.
> You can get a WebSocket from popular providers such as [Alchemy](https://www.alchemy.com/) and [Infura](https://www.infura.io/). Here's a [guide](https://ethereum.org/en/developers/tutorials/using-websockets/) for using WebSockets with Alchemy.

### Getting the smart contract address

For the smart contract address, we'll use Ethereum's [USDT](https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7) contract, with an address of `0xdAC17F958D2ee523a2206206994597C13D831ec7`.

Alternatively, if you prefer to use a different smart contract, you can:
- Find Ethereum smart contracts on [Etherscan](https://etherscan.io/). 
- Locate ERC20 token addresses on [Coingecko](https://www.coingecko.com/).
- Or, use your own deployed contract address.

> **Important:** Remember to update the `src/abi.json` file with the ABI for your chosen smart contract. 

Depending on your use case, you can choose to listen to events of popular smart contracts or your deployed smart contracts. You can also choose to listen to smart contracts in different blockchain networks as long as it's EVM-compatible and you have a WebSocket endpoint for that blockchain network. 

### Configuring the .env file

Once you have both the **WebSocket endpoint** and the **smart contract address**, you can configure your `.env` file like this:
```makefile
ETH_WSS_ENDPOINT=wss://eth-mainnet.g.alchemy.com/v2/<YOUR_API_KEY>
ETH_SMART_CONTRACT_ADDRESS=0xdac17f958d2ee523a2206206994597c13d831ec7
```

## Reviewing and testing the code

Now that you've set up the environment variables, let's review the code to understand how the smart contract event listener works. We'll also test the code to verify that it works before we deploy it to AWS. 

### Reviewing the smart contract event listener code

The code can be divided into several parts:

1. **Imports and Workarounds**:   
   - We import the following libraries:
     - `dotenv` - to load environment variables from `.env` files for local development.
     - `abi.json` - the ABI of the smart contract you plan to listen to. In this case, an ERC20 ABI.
     - `web3` - library to allow subscription to smart contract events. 
   - Then a workaround is implemented for `BigInt` to allow JSON.stringify() of smart contract event logs, which improves the readability of CloudWatch logs when we deploy to AWS later. 
    ```ts
    import 'dotenv/config';
    import * as erc20abi from './abi.json';
    import Web3, { Contract, WebSocketProvider } from 'web3';

    /* 
    Workaround for JSON.stringify() event logs with BigInt values. 
    We need to stringify event logs for more readable logging in CloudWatch.
    https://github.com/GoogleChromeLabs/jsbi/issues/30
    */
    (BigInt.prototype as any).toJSON = function () {
    return this.toString();
    };
    ```

2. **Main Function - `startEventListener()`**:
   - This function creates a WebSocket connection using your WebSocket endpoint. 
   - Then, the function subscribes to the smart contract address that you've specified. 
   - Finally, the function subscribes to the `Transfer` and `Approval` events using the `subscribeToEvent()` function.
    ```ts
    /**
     * Starts the smart contract event listener. 
     * Websocket Provider config: https://docs.web3js.org/api/web3-providers-ws/class/WebSocketProvider
     * @param chain - Name of the blockchain network for logging purposes.
     * @param wssEndpoint - Websocket endpoint for the blockchain network.
     * @param contractAddress - Smart contract address.
     */
    const startEventListener = async (chain: string, wssEndpoint: string, contractAddress: string) => {
    const provider = new WebSocketProvider(
        wssEndpoint,
        {},
        {
        autoReconnect: true,
        delay: 10000, // Default: 5000 ms
        maxAttempts: 10, // Default: 5
        },
    );

    provider.on('connect', () => {
        console.log(`Connected to ${chain} websocket provider`);
    });

    provider.on('disconnect', error => {
        console.error(`Closed ${chain} webSocket connection`, error);
    });

    const web3 = new Web3(provider);

    /*
        Smart contract event listeners

        Listening to events:
        - Transfer
        - Approval
    */
    const contract = new web3.eth.Contract(erc20abi, contractAddress);
    await subscribeToEvent(chain, contract, 'Transfer');
    await subscribeToEvent(chain, contract, 'Approval');
    };
    ```

3. **Helper Function:  `subscribeToEvent()`**:
   - This makes the event subscription reusable, especially if you plan to listen to multiple smart contract events. 
   - After creating a smart contract event subscription, we listen to these subscription events:
     - **connected** - it means that you've successfully subscribed to a smart contract event.
     - **data** - every time an event is generated by smart contract interactions, you'll receive event logs here.
     - **changed** - if for some reason the event has been changed or reverted by the blockchain network, you'll receive event logs here.
     - **error** - if there's an error while listening to smart contract events, you'll receive the error details here.

    ```ts
    /**
     * Subscribes to a smart contract event.
     * @param chain - Name of the blockchain network for logging purposes.
     * @param contract - Smart contract address.
     * @param eventName - Name of the event to subscribe to.
     */
    const subscribeToEvent = async (chain: string, contract: Contract<typeof erc20abi>, eventName: string) => {
    const subscription = await contract.events[eventName]();

    subscription.on('connected', subscriptionId => {
        console.log(`${chain} USDT '${eventName}' SubID:`, subscriptionId);
    });

    subscription.on('data', event => {
        console.log(`${chain} USDT '${eventName}'`, JSON.stringify({ event })); // cannot json.stringify BigInt...
    });

    subscription.on('changed', event => {
        // Remove event from local database
    });

    subscription.on('error', error => {
        console.error(`${chain} USDT '${eventName}' error:`, error);
    });
    }
    ```
4. **Starting the Listener**:
   - Finally, the `startEventListener()` function is called to start listening to smart contract events.
    ```ts
    /*
    Start smart contract event listeners

    Chains:
        - Ethereum
    */
    startEventListener('Ethereum', process.env.ETH_WSS_ENDPOINT!, process.env.ETH_SMART_CONTRACT_ADDRESS!);
    ```

Here is the full snippet of the smart contract event listener code. 

[src/app.ts](https://github.com/jdg2896/smart-contract-event-listener/blob/main/src/app.ts)
```ts
import 'dotenv/config';
import * as erc20abi from './abi.json';
import Web3, { Contract, WebSocketProvider } from 'web3';

/* 
  Workaround for JSON.stringify() event logs with BigInt values. 
  We need to stringify event logs for more readable logging in CloudWatch.
  https://github.com/GoogleChromeLabs/jsbi/issues/30
*/
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

/**
 * Starts the smart contract event listener.
 * Websocket Provider config: https://docs.web3js.org/api/web3-providers-ws/class/WebSocketProvider
 * @param chain - Name of the blockchain network for logging purposes.
 * @param wssEndpoint - Websocket endpoint for the blockchain network.
 * @param contractAddress - Smart contract address.
 */
const startEventListener = async (chain: string, wssEndpoint: string, contractAddress: string) => {
  const provider = new WebSocketProvider(
    wssEndpoint,
    {},
    {
      autoReconnect: true,
      delay: 10000, // Default: 5000 ms
      maxAttempts: 10, // Default: 5
    },
  );

  provider.on('connect', () => {
    console.log(`Connected to ${chain} websocket provider`);
  });

  provider.on('disconnect', error => {
    console.error(`Closed ${chain} webSocket connection`, error);
  });

  const web3 = new Web3(provider);

  /*
    Smart contract event listeners

    Listening to events:
      - Transfer
      - Approval
  */
  const contract = new web3.eth.Contract(erc20abi, contractAddress);
  await subscribeToEvent(chain, contract, 'Transfer');
  await subscribeToEvent(chain, contract, 'Approval');
};

/**
 * Subscribes to a smart contract event.
 * @param chain - Name of the blockchain network for logging purposes.
 * @param contract - Smart contract address.
 * @param eventName - Name of the event to subscribe to.
 */
const subscribeToEvent = async (chain: string, contract: Contract<typeof erc20abi>, eventName: string) => {
  const subscription = await contract.events[eventName]();

  subscription.on('connected', subscriptionId => {
    console.log(`${chain} USDT '${eventName}' SubID:`, subscriptionId);
  });

  subscription.on('data', event => {
    console.log(`${chain} USDT '${eventName}'`, JSON.stringify({ event })); // cannot json.stringify BigInt...
  });

  subscription.on('changed', event => {
    // Remove event from local database
  });

  subscription.on('error', error => {
    console.error(`${chain} USDT '${eventName}' error:`, error);
  });
};

/*
  Start smart contract event listeners

  Chains:
    - Ethereum
*/
startEventListener('Ethereum', process.env.ETH_WSS_ENDPOINT!, process.env.ETH_SMART_CONTRACT_ADDRESS!);
```

### Testing the smart contract event listener code

Now that we've reviewed the code, let's test the code to make sure everything is working as expected.

There are multiple ways to test the code locally:
- **TypeScript**: Run the TypeScript file using `ts-node`:
  - `npm run start:dev`
- **JavaScript**: Build and run the JavaScript file using `node`:
  - `npm run build`
  - `npm run start`
- **Docker:**: Build the Docker image and run the container:
  1. Build the TypeScript file: `npm run build`
  2. Build the Docker image: `docker build -t smart-contract-event-listener:latest .`
  3. Run the Docker container in detached mode: `docker run -d --env-file .env --name smart-contract-event-listener smart-contract-event-listener:latest`
  4. Get the Docker container logs: `docker logs smart-contract-event-listener`
  5. Stop the Docker container: `docker stop smart-contract-event-listener`

> I recommend building the Docker image and running the container locally to make sure the code works as expected before deploying to AWS. 

After testing, you should see some Ethereum USDT `Transfer` and `Approval` events in your logs.
```bash
Ethereum USDT 'Transfer' {"event":{"address":"0xdac17f958d2ee523a2206206994597c13d831ec7","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000001fbcb0803529aea20d6b4af5845fd041e54c50d0","0x0000000000000000000000009a4b7d5916d750b9a864f316b9a2483576412bb1"],"data":"0x000000000000000000000000000000000000000000000000000000000ee6b280","blockNumber":"18597353","transactionHash":"0x61adfbd4a045c02d1b5fea0cce8747dab9b969d552db6091c19168176da6d04c","transactionIndex":"116","blockHash":"0xdc592d23957f1a9fe63e2bd7e03c394b759b7bf48139845877bf0098e82aa8c4","logIndex":"445","removed":false,"returnValues":{"0":"0x1fBCb0803529AeA20d6B4AF5845FD041E54c50d0","1":"0x9A4b7D5916D750B9A864F316b9a2483576412BB1","2":"250000000","__length__":3,"from":"0x1fBCb0803529AeA20d6B4AF5845FD041E54c50d0","to":"0x9A4b7D5916D750B9A864F316b9a2483576412BB1","value":"250000000"},"event":"Transfer","signature":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","raw":{"data":"0x000000000000000000000000000000000000000000000000000000000ee6b280","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000001fbcb0803529aea20d6b4af5845fd041e54c50d0","0x0000000000000000000000009a4b7d5916d750b9a864f316b9a2483576412bb1"]}}}

Ethereum USDT 'Approval' {"event":{"address":"0xdac17f958d2ee523a2206206994597c13d831ec7","topics":["0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925","0x00000000000000000000000062844dc43c064253e21b2b8ac830b28f307184f0","0x000000000000000000000000000000000022d473030f116ddee9f6b43ac78ba3"],"data":"0x000000000000000000000000000000000000000000000000000000012a05f200","blockNumber":"18597353","transactionHash":"0x29de66457b8cd4895e354aee842404e66ed34e176fdd3582bb3b9352d9ac7c8f","transactionIndex":"129","blockHash":"0xdc592d23957f1a9fe63e2bd7e03c394b759b7bf48139845877bf0098e82aa8c4","logIndex":"465","removed":false,"returnValues":{"0":"0x62844Dc43C064253E21B2b8aC830B28f307184F0","1":"0x000000000022D473030F116dDEE9F6B43aC78BA3","2":"5000000000","__length__":3,"owner":"0x62844Dc43C064253E21B2b8aC830B28f307184F0","spender":"0x000000000022D473030F116dDEE9F6B43aC78BA3","value":"5000000000"},"event":"Approval","signature":"0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925","raw":{"data":"0x000000000000000000000000000000000000000000000000000000012a05f200","topics":["0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925","0x00000000000000000000000062844dc43c064253e21b2b8ac830b28f307184f0","0x000000000000000000000000000000000022d473030f116ddee9f6b43ac78ba3"]}}}
```

## Deploying the smart contract event listener

Now that you have a working smart contract event listener, we'll deploy the resources to AWS using [AWS CDK](https://aws.amazon.com/cdk/), which is an Infrastructure as Code (IaC) tool. AWS CDK allows you to configure, deploy, and manage AWS cloud resources using popular programming languages such as TypeScript. 

The [sample repository](https://github.com/jdg2896/smart-contract-event-listener) I shared with you earlier is generated with AWS CDK. The smart contract listener code and cloud resources are added after. 
> For more info on generating your own AWS CDK TypeScript boilerplate, check this [AWS documentation](https://docs.aws.amazon.com/cdk/v2/guide/work-with-cdk-typescript.html#typescript-newproject).

### Installing the AWS CLI

If you don't have AWS CLI installed, you can go to the [Get Started](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) section and [Install/Update](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) section of the AWS CLI documentation. 

### Configuring a named profile in AWS CLI

Now you'll configure your AWS CLI credentials so that you have the permissions needed to deploy AWS resources in the region that you specify.

You can either configure a **default profile** or use a **named profile** for your AWS CLI credentials. 
> I recommend configuring a named profile especially if you're working with multiple AWS accounts. 

Make sure you already have your own AWS IAM account or access keys. If not, then you can refer to this [guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).

#### To configure an AWS CLI named profile:
1. Run the `aws configure --name profile-name`. 
2. Add your AWS IAM account `Access Key` and `Secret Access Key`. 
3. Specify the [region](https://aws.amazon.com/about-aws/global-infrastructure/regions_az/?p=ngi&loc=2&refid=c4f45c53-585c-4b31-8fbf-d39fbcdc603a&trkcampaign=innovate-mad-apj) where you'll deploy your AWS resources.

#### Then to use the credentials in the named profile:
- For Linux or macOS: `export AWS_PROFILE=profile-name`
- For Windows: `setx AWS_PROFILE profile-name`

For more information, refer to the [AWS CLI documentation](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-using-profiles). 

### Installing the AWS CDK CLI

Now that you've installed and configured AWS CLI, it's time to install AWS CDK CLI. 

To install AWS CDK:
- Run the install command: `npm install -g aws-cdk`.
- Then check that AWS CDK is installed correctly: `cdk --version`

For more information, refer to the [AWS CDK documentation](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install).

### Reviewing the AWS CDK code

Before we deploy the smart contract event listener, let's review the AWS CDK code and the AWS resources that we'll deploy. 

The first file `bin/smart-contract-event-listener.ts` imports the `SmartContractEventListenerStack`, then instantiates a CDK app where we can specify the `stack name` and optional properties. 

If you noticed in the comments, you can also configure your AWS account and region in the properties. But since you've already configured your AWS CLI credentials earlier, you don't need to uncomment these. 

[bin/smart-contract-event-listener.ts](https://github.com/jdg2896/smart-contract-event-listener/blob/main/bin/smart-contract-event-listener.ts)
```ts
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SmartContractEventListenerStack } from '../lib/smart-contract-event-listener-stack';

const app = new cdk.App();
new SmartContractEventListenerStack(app, 'SmartContractEventListenerStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */
  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
```
Then the `lib/smart-contract-event-listener-stack.ts` file defined the AWS cloud resources that we'll deploy.

The `SmartContractEventListenerStack` will deploy the following resources:
- [VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
- [ECS Cluster](https://aws.amazon.com/ecs/)
  - [Fargate Service](https://aws.amazon.com/fargate/)
  - [Fargate Task Definition](https://docs.aws.amazon.com/AmazonECS/latest/userguide/task_definitions.html)

![SmartContractEventListenerStack Diagram](https://res.cloudinary.com/dlieqpdfd/image/upload/v1700360758/Smart%20Contract%20Event%20Listener/ecs_kr5yio.svg)

[lib/smart-contract-event-listener-stack.ts](https://github.com/jdg2896/smart-contract-event-listener/blob/main/lib/smart-contract-event-listener-stack.ts)
```ts
import 'dotenv/config';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';

export class SmartContractEventListenerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'SmartContractEventListenerVPC', {
      vpcName: 'SmartContractEventListenerVPC',
      // EIP soft limit is 5, need to increase limit to increase AZ
      maxAzs: 1,
    });

    const cluster = new ecs.Cluster(this, 'SmartContractEventListenerCluster', {
      clusterName: 'SmartContractEventListenerCluster',
      vpc: vpc,
    });

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'SmartContractEventListenerTaskDef', {
      family: 'TaskDef',
    });

    taskDefinition.addContainer('SmartContractEventListener', {
      containerName: 'Container',
      environment: {
        ETH_WSS_ENDPOINT: process.env.ETH_WSS_ENDPOINT!,
        ETH_SMART_CONTRACT_ADDRESS: process.env.ETH_SMART_CONTRACT_ADDRESS!,
      },
      // can be .fromContainerRegistry() if available to ECR
      image: ecs.ContainerImage.fromAsset(''),
      logging: new ecs.AwsLogDriver({
        streamPrefix: 'SmartContractEventListener',
        mode: ecs.AwsLogDriverMode.NON_BLOCKING,
      }),
    });

    new ecs.FargateService(this, 'SmartContractEventListenerFargateService', {
      serviceName: 'FargateService',
      cluster,
      taskDefinition,
    });
  }
}

```

### Deploying the AWS resources using AWS CDK

Now that we've reviewed the AWS CDK code and AWS resources, it's time to deploy your smart contract event listener.

To deploy your smart contract event listener:
1. Build the source files: `npm run build`.
2. Deploy the AWS resources: `cdk deploy`.
3. Review the changes, then when prompted with `Do you wish to deploy these changes (y/n)?`, enter `y`.

You should see a progress bar of the AWS resources that are being deployed. 
![AWS CDK deployment progress bar](https://res.cloudinary.com/dlieqpdfd/image/upload/v1700360759/Smart%20Contract%20Event%20Listener/deployment-progress_tvludh.png)

The deployment should take around 5 minutes to complete, so in the meantime, you can take a quick break. 

Once the deployment completes, you should see the deployment time and the CloudFormation stack ARN. 
![AWS CDK deployment complete](https://res.cloudinary.com/dlieqpdfd/image/upload/v1700360758/Smart%20Contract%20Event%20Listener/deployment-complete_bzsss7.png)

> **Note:** If your deployment takes longer than 5 minutes and seems to be stuck, then you can check the ECS service logs, as shown in [this section](###Check-the-smart-contract-event-listener-logs-in-AWS). 
>
> If the logs show runtime errors, then you can do the following:
> - Follow this [guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-console-delete-stack.html) to delete the `SmartContractEventListenerStack` in CloudFormation. 
> - Review and test the code and Docker build locally to verify it's working as intended.
> - Build and redeploy using the above steps.

### Check the smart contract event listener logs in AWS

Now that you've successfully deployed a smart contract event listener, it's time to verify if it's receiving events from the Ethereum USDT contract or your contract.

Here are the steps to check the logs from your smart contract event listener:

1. In the AWS console, go to the **ECS**, then click on **SmartContractEventListenerCluster**.
![AWS Console ECS Dashboard](https://res.cloudinary.com/dlieqpdfd/image/upload/v1700360759/Smart%20Contract%20Event%20Listener/ecs-dashboard_kc8ekw.png)

1. Then, go to **Services**, and click **FargateService**.
![AWS Console ECS Services](https://res.cloudinary.com/dlieqpdfd/image/upload/v1700360759/Smart%20Contract%20Event%20Listener/ecs-services_lxslxj.png)

1. Finally, click **Logs**.
![AWS Console ECS Logs](https://res.cloudinary.com/dlieqpdfd/image/upload/v1700360759/Smart%20Contract%20Event%20Listener/ecs-logs_msvy83.png)

You should now be seeing the logging of events from the Ethereum USDT contract or the smart contract you specified. 

### Cleaning up the AWS resources (Optional)

After testing the smart contract event listener, it's recommended to clean up the deployed AWS resources especially if you're just doing a proof of concept. 

To delete the deployed AWS resources, run the `cdk destroy` command. 

This makes sure that you **avoid incurring unnecessary charges** on your AWS account, since running an ECS cluster is not part of the [AWS Free Tier](https://aws.amazon.com/free/), and would incur charges if it's left running in the cloud. 

## Some caveats and improvements to consider

We've verified that the smart contract event listener is working. Now I'll go through some of the caveats and improvements to consider since I've personally implemented a smart contract event listener at the [startup](https://p33r.finance/) I'm currently working at.

### Integrating smart contract events into other services

You might be wondering how you can integrate smart contract events into your backend systems, so here are some ideas:
- [Trigger a Lambda with CloudWatch Logs](https://docs.aws.amazon.com/lambda/latest/dg/services-cloudwatchlogs.html)
- Add code in the smart contract event listener subscriptions to trigger other parts of your system. 

I would recommend the first idea since Lambda is flexible and can fit a lot of use cases. You can also trigger Lambda functions every time a smart contract event is logged into CloudWatch. 

At [RAILS by P33R](https://www.rails.p33r.finance/), we use this approach. The app allows customers to off-ramp their crypto [stablecoins](https://www.investopedia.com/terms/s/stablecoin.asp) ([USDT](https://tether.to/en/), [USDC](https://www.circle.com/en/usdc), and [DAI](https://makerdao.com/en/)) into fiat currencies (SGD, PHP). 

A high-level implementation of the app's crypto-to-fiat use case is shown below. The flow is as follows:
- **Customer** deposits **crypto stablecoins** to the **escrow smart contract**. 
- **Escrow smart contract** emits a `Deposit` event.
- **Smart contract event listener** receives the `Deposit` event, and logs to **CloudWatch**.
- **CloudWatch log** triggers the **Fiat Disbursement Lambda function**.
- **Customer** receives **fiat** in their **bank account** or **e-wallet**. 

![RAILS](https://res.cloudinary.com/dlieqpdfd/image/upload/v1700309954/Smart%20Contract%20Event%20Listener/RAILS_High_Level.drawio_rwiyga.svg)

This is an example implementation that you can reference for your own use cases. 

### Health checks and error handling

If you plan to use smart contract event listeners in production, monitoring the health of the service and handling errors is a requirement. 

At the time of writing this, I hadn't figured out how to implement health checks for the smart contract event listeners in ECS. A workaround for this is to implement [CloudWatch alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html). You can send email alerts when the smart contract event listener throws an error. 

I also encountered a specific issue related to the **block limit when querying smart contract events over 10,000 blocks**. This was an issue with [QuickNode](https://www.quicknode.com/), but other providers also have a 10,000 block limit for querying logs and events. For more information, here is [QuickNode's support article](https://support.quicknode.com/hc/en-us/articles/10258449939473-Is-there-a-block-range-limit-for-querying-logs-and-events) on this topic.

> This 10,000 block limit error happens because when you create a smart contract event subscription in `Web3.js`, it automatically filters for smart contract events, starting from the block number at the time of the subscription. Let's assume that the current block number is at 1,001. Then the smart contract event listener can safely query for events until block number 11,001. The WebSocket provider will throw an error when the block number exceeds 11,001. 

Fortunately, whenever the smart contract event listener throws an error, the ECS cluster will automatically restart the service. This is the default behavior since ECS is a fully managed AWS service for container orchestration. Even with this, it's still important to improve the health checks and error handling, and not fully rely on AWS error handling. 

### Improving reliability with the AWS Well-Architected framework

As we're building cloud infrastructure in AWS, it's important to follow the [AWS Well-Architected framework](https://aws.amazon.com/architecture/well-architected/?wa-lens-whitepapers.sort-by=item.additionalFields.sortDate&wa-lens-whitepapers.sort-order=desc&wa-guidance-whitepapers.sort-by=item.additionalFields.sortDate&wa-guidance-whitepapers.sort-order=desc). One of the pillars of the Well-Architected framework is [Reliability](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html). This means removing single points of failure in the smart contract event listener, resulting in more resilient architectures. 

One way of improving the reliability of the smart contract event listener is to support multiple availability zones in the ECS cluster. This ensures redundancy in the event of a failure in one availability zone. For more information, here's a blog on [Amazon ECS availability best practices](https://aws.amazon.com/blogs/containers/amazon-ecs-availability-best-practices/) and AWS' [Shared Responsibility Model for Resiliency](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/shared-responsibility-model-for-resiliency.html).

Once you've implemented the smart contract event listener cluster to be in multiple availability zones, you'll need your systems to be [idempotent](https://en.wikipedia.org/wiki/Idempotence). This means that when you receive the same smart contract event multiple times, it should only be processed once in your system. 

## Conclusion

To recap, we've gone through the process of implementing and deploying a smart contract event listener with the following steps:
- Configuring the **WebSocket endpoint** and **smart contract address**.
- Reviewing and testing the smart contract event listener code.
- Deploying the smart contract event listener to AWS using **AWS CDK**.
- Verifying the deployed smart contract event listener is working. 

I've also shared some caveats and improvements to consider as you build on top of the listener:
- Integrating the smart contract event listener with different AWS services such as **Lambda functions**.
- Improving reliability by deploying the smart contract event listener to multiple **availability zones (AZ)**.
- Setting up CloudWatch alarms for error monitoring.

Listening to smart contract events enables developers to integrate smart contracts into different APIs and enable real-time updates. AWS CDK allows you to deploy reliable cloud infrastructure with just a few lines of code, giving you more confidence in your deployments, and allowing you to focus on solving real-world problems. 

If you've made it this far, thank you for reading! If you have any questions, feel free to comment or contact me [here](https://linktr.ee/jdg2896). 
