# Aogra React Demo

A basic demo of [AgoraSDK](https://github.com/AgoraIO/Basic-Video-Call/tree/master/One-to-One-Video/Agora-Web-Tutorial-1to1) with React UI Bindings.

## [Live Demo](https://aaronphy.github.io/agora_demo/)


## Features
- TypeScript: Written in TypeScript with predictable static types
- Mobx: Reactive to AgoraSDK Management
- Responsive:Responsive design to adapt automatically to different desktop device

## Prerequisites

- Node.js 10.0.0+
- A web server that supports SSL (https)

## Quick Start

This section shows you how to prepare, and run the sample application.

### Obtain an App ID

To build and run the sample application, get an App ID:
1. Create a developer account at [agora.io](https://dashboard.agora.io/signin/). Once you finish the signup process, you will be redirected to the Dashboard.
2. Navigate in the Dashboard tree on the left to **Projects** > **Project List**.
3. Save the **App ID** from the Dashboard for later use.
4. Generate a temp **Access Token** (valid for 24 hours) from dashboard page with given channel name, save for later use.

### Run Web-Server

1. Launch server via following commands in working folder,
    ```
    npm install && npm run dev
    ```
2. Enter Valid APPID, Token, Channel and click **JOIN**