# Responsive email template generator for Yeoman

Quickly spit out a template for platforms such as Campaign Monitor and Mailchimp.

## Setup

Once you're up and running with [Yeoman](http://yeoman.io/), install the generator:

    npm install -g generator-rwdmail

Then create a new directory a `cd` into it:

    mkdir my-email-project && cd $_

And call your Yeoman:

	yo rwdmail

## Usage

Run `grunt` from your project directory to run a local server and develop in real-time.

When you're ready for production, run `grunt build` to compile the template into __dist__.

If you're building specifically for [Campaign Monitor](http://www.campaignmonitor.com/), run `grunt cm`, then upload __index.html__ and __assets.zip__.

## License

[MIT](http://opensource.org/licenses/MIT)
