# ReadMe

**Apple News API Client Utility**

This ReadMe explains how to install, configure, and use the Apple News API client to post an article.

## 1.0 System Requirements

- OS X 10.9.0 or later
- Xcode 6 or later (Or, optionally, you can just install the Command Line Tools for Xcode. See [developer.apple.com](https://developer.apple.com).)

## 2.0 Installation and Setup Information

To use the Apple News API, do the following:

**Step 1:** Make sure you have downloaded the Ruby CLI for the Apple News API Client Utility. Using Finder, check the contents of the Apple-News-API-CLI folder in your Downloads directory. You should see the papi-client-{VERSION}.gem file.

**Step 2:** Run the following commands to install the gem:

    gem install rails -v 4.2.2

    sudo gem install Apple-News-API-CLI/papi-client-1.10.4.gem

If the commands are not successful, check that you have Xcode installed. If you don't, you can download it from the App Store.

**Step 4:** Use any text editor to create a configuration file called .papi in the current user's home directory (at ~/.papi).

**Step 5:** Add the following information to the .papi configuration file:

    #<Your Channel>
    endpoint: https://news-api.apple.com
    channel_id: <Your Channel ID>
    key: <Your API Key ID>
    secret: <Your API Key Secret>

where angle brackets (<>), enter your own unique information.

**Note:** Use the same publisher credentials you used when you set up your channel.

**Step 6:** Run the following command to get information about your test channel:

    papi-client channel get

You should see the following type of information about the channel:

    {
    	"data": {
    	"createdAt": "2016-03-19T22:50:50Z",
    	"modifiedAt": "2016-03-26T04:07:11Z",
    	"id":"42424242-4242-4242-4242-424242424242",
    	"type": "channel",
    	"links": {
    		"defaultSection":"https://news-api.apple.com/sections/43434343-4343-4343-4343-434343434343",
    		"self": "http://news-api.apple.com/channels/49f6a7d3-eb20-3ab2-be3b-8399e7f28abf"
    	 },
    	 "name":"Example Channel",
    	 "website": "http://www.example.com/"
    	}
    }

**(All information recieved from Apple)**
