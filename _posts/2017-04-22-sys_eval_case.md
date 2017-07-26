---
layout: post
project: True
title: mailing acquisition case
feature: assets/img/woodpattern.jpg
excerpt: "a full machine learning pipeline to provide predictions for effective mailings in a mailing acquisition campaign case study"
tags: [data science, machine learning, student, case study]
date: 2017-04-21
comments: false
---

## Overview

As part of the course SYS 3034: Systems Evaluation I, my team and I explored the challenge of optimizing the mailing strategy of a major company conducting a mailing acquisition campagin. At my team's disposal was a labeled dataset consisting of 50k rows that contained the demographic information, and response amount (responses were limited to $0, $100, and $150) of individuals who had been previously sent mail as part of an acquisition campaign. The goal was simple: score another, unlabeled 50k-row dataset of potential recipients in order to maximize the response revenue of the top 5,000 mailings.

At any time, feel free to take a look at the full [Jupyter Notebook]({{ site.url }}/assets/notebooks/sys_eval_notebook.html) that I created to see the full analysis and pipeline.

## The challenge
Rather quickly it became clear that reducing the problem to a matter of predicting likelihood of response, regardless of amount, was a quite promising approach. Since the response rate in our dataset was 10%, we realized that boosting the response rate of our top 5k targets to 15-20% would equate to a 50%-100% lift in revenue, while getting a *perfect* prediction of whether a respondant would buy the $100 option or the $150 option would only cause a 20% increase in lift maximum.

## The answer
To conquer this challenge of response likelihood, we turned to the following system for discovering useful features, training and evaluating a model, and making our final predictions:

![learning system overview flow diagram][overview]

Basically, I devised a simply system for splitting out a hold-out test set of data so that we could see not only the model target function (log loss of prediction accuracy), but also the response rate and average per-mailing response for the top 10% of the holdout set to get a good idea for how much lift we are actually providing with our models. 

Data comes in, gets prepped to train models with, split into a train and test set, and fed into "the black box." After the black box does its magic, we get performance metrics that let us understand how much lift our model will provide with its top 5k mailing suggestions as compared to the random response.

## The "black-box"

![flow diagram of the black box system][blackbox]

As you can see from the above diagram, the "black-box" solution I came up with consisted of three major components: feature selection, model tuning, and model training. A random forest model was fit with the entire dataset (all 200-ish columns), and then every features with less than average importance was thrown out, leaving us with about a hundred features. Next, a basic logistic regression model was trained, which gave us a quite powerful baseline to beat. This simple linear model actually raised top-10% scoring response rate all the way up to well over 14% on our test set, which translates into more than 40% lift (compared to random mailing) if implemented as our mailing strategy. However, we had much bigger guns to bring to bear.

I used the popular [xgboost](https://github.com/dmlc/xgboost) library to train a gradient-boosted decision trees model that performed at the same level as the logistic regression under its default parameters. A plethora of regularization and bias-versus-variance-rebalancing parameters are available under this complex model, however, unlike the simplistic high-bias linear model that is logistic regression. Accordingly, by using the [scikit-optimize](https://github.com/scikit-optimize/scikit-optimize) library to try out 700 hyperparameter configurations in a somewhat-intelligent manner, I was able to find a configuration that trained a boosted trees model that exceeded a 16% response rate with its top-10% picks on the test set. My team thought this 60% expected lift was quite impressive, and we pulled the trigger with this configuration by training with the same configuration on all 50k rows of the labelled set before generating and submitting likelihood-of-response scores on the unlabeled 50k.

## The outcome
As one might imagine, the lift that our powerful predictive system provided was nothing to laugh at. As tested on the second 50k rows of recipient data, our top-10% predictions posted a 15.4% response rate and offered something in the ballpark of a 56% lift on profit. The second-place team ran with a logistic regression model on about 50 variables and ended up with about 45% lift. While such a model in itself can be considered quite sophisticated compared to a basic hunch-based or random mailing strategy, it was reassuring to me that the development and correct application of much higher-complexity learning algorithms can still offer a quite significant boost even on medium-sized datasets containing a quite limited amount of predictive information. I don't think many directors of marketing that can scoff at an extra 10% lift in revenue in a mailing acquisition campaign! 


[overview]: {{ site.url }}/assets/img/sys_eval_case/overview.png
[blackbox]: {{ site.url }}/assets/img/sys_eval_case/ml_pipeline.png

