#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {TransactionMailStack} from '../lib/transaction-mail-stack';
import {Construct} from 'constructs';


class TransactionMailService extends Construct {
    constructor(scope: Construct, id: string) {
        super(scope, id);
        // servis icerisine stack eklenir
        new TransactionMailStack(this, 'v1', {
            description: 'Transaction Mail Stack v1',
        });
    }
}

// application olusturuluyor
const app = new cdk.App();
// application icerisine servis ekleniyor
new TransactionMailService(app, 'TransactionMailService');
// servisimizi bir tag ile isaretliyoruz
cdk.Tags.of(app).add('stack', 'transaction-mail-service');