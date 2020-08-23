# 2. Use Terraform CDK

Date: 2020-08-23

## Status

Accepted

## Context

I want infrastructure *as code* not _as config_

AWS CDK is that but leans on cloudformation which is a bit weird.

Terraform CDK is new (ooh shiny) but leans on the well respected ability of terraform to manage infrastructure and lets me write actual code to manage it.  

## Decision

To use terraform CDK to manage infrastructure

## Consequences

Until it is too painful I won't use the serverless framework (SLS) to manage lambda/api gateway etc. Instead will try and use only terraform cdk. This might mean I end up with a lot of boilerplate wiring that SLS would abstract away
