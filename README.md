# adjust-sdk

Unofficial Adjust Web SDK

## Installation

```
npm install @mururu/adjust-sdk --save
```

## Usage

```
import {Adjust, AdjustConfig, AdjustEvent} from '@mururu/adjust-sdk';

const config = new AdjustConfig("adjust-token", "sandbox", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", "web");
const adjust = Adjust.create(config);
adjust.trackSession();
```
