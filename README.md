Welcome to Budgup
=================
 
 Budgup is an application that helps you manage your money. Indeed, with our algorithm you can predict you balance at the end of the month.
 
![](/images/general_illustration.png)

 
Table of contents
=================

* [Environment to use Budgup](#environment-to-use-Budgup)
    * [What is Cozy?](#what-is-cozy)
    * [Install a Cozy environment](#install-a-cozy-environment)
    * [Get Budgup on my Cozy](#get-budgup-on-my-cozy)
* [Releases](#releases)
    - [Release 0.2.0](#release-0-2-0)
    - [Release Alpha 1.0](#release-alpha)
    - [Release Beta 2.0](#release-beta)
* [Test the app](#test-the-app)
    - [Alpha and Beta testers](#alpha-and-beta-testers)
    - [Report the issues](#report-the-issues)


Environment to use Budgup
=========================

What is Cozy
------------

Cozy is a personal web deployment platform, which enables you to quickly bootstrap applications and interact with your data.
 It stands on a server - between your application and the operating system - easing the pain of system administration,
 web development and security. Get your data back home!

Install a Cozy environment
--------------------------

To install a Cozy environment on your computer, follow that tutorial : 

-> [Tutorial to install the environment](https://dev.cozy.io/v2.html#set-up-the-development-environment) <-

Get Budgup on my Cozy
---------------------

Once the environment installed, you can get Budgup. Follow these steps :

1. Go on your local Cozy home : http://localhost:9104/#home
2. Click on "Store"
3. Scroll to the bottom, you'll see "Install an app from its Git Repository"
4. Copy-paste that link : https://github.com/ProjetBudgup/Budgup and click on "Install"
5. Click on Budgup :) Your app is ready !


Releases
========


Release 0.2.0
-------------
 
 With that first version of budgup you can :
 
  - [x] See all you future spent in a very explicit way.
  - [x] Anticipate you balance : if an operation occurred more than twice during the last three months, that means that you'll probably have the same the next month.
  
Release Alpha 1.0
-----------------
 
 Thanks to the features coming, the algorithm will be more precise. It will be able to :
 
 - [x] Detect all the operations already paid
 - [x] Give you a spending range (min / max) for the irregular operations 
 - [x] To handle the case where the same raw occurs more than once during the same month
 
Release Beta 2.0
---------------------

 - [x] You can test the three versions of our super algorithm.
 - [x] Now you can download your own json file and apply the three version of the algorithm.  Thus you can see the improvement of our releases.
 - [x] This release has removed the special characters
 
Test the app
============

Alpha and Beta testers 
----------------------

First, we want to thank you to help us to improve our software by testing it. The following lines will explain you how to 
test Budgup and also how to report us the bugs or issues. 

 - Go on http://192.168.7.183:9104/
 - Enter this password : "testeurbudgup"
 - Click on the app
 - Import your bank json files to analyse by algorithms and test it
 
Report the issues
-----------------
 
 If you notice a bug, please create a new issue [there](https://github.com/ProjetBudgup/Budgup/issues) or send a mail to projetbudgup@gmail.com.
 


