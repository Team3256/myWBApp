# myWB React Native App [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

This repo contains the code for the myWB app, which works with the [myWB Database](https://github.com/Team3256/WB_Digital_Infrastructure).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have [Node](https://nodejs.org/en/), [React Native](https://facebook.github.io/react-native/) and [Yarn](https://yarnpkg.com/en/) installed to run the app.

### Installing

Clone the current repository:

```
git clone https://github.com/Team3256/myWBApp.git
```

Change directory into the app folder:

```
cd myWBApp
```

Now run this, it should install all dependencies and get you ready to run the app.

```
yarn install
```

Then run ```react-native run-android``` to see the app in action! (make sure you also have the server running and the app is connecting to it)

If you want to run the app on iOS, make sure you have Xcode installed and navigate to the ```ios``` folder, then open ```myWB.xcworkspace``` and press the play button in the top left corner. If you run into errors, double check and make sure you're using the ```.xcworkspace``` instead of the ```.xcodeproj```.

## Deployment

TODO: Deployment through the App Store, Google Play Store, and Microsoft CodePush.

## Versioning

We use [SemVer](http://semver.org/) for versioning.
Format: "MAJOR.MINOR.PATCH"

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner
* PATCH version when you make backwards-compatible bug fixes.

#### Example:

package.json:

```
"version": "1.0.0"
```

## Authors

* **John Panos** - _Initial work/architecture design/planning/programming_ - [johnpanos](https://github.com/johnpanos)
* **Marc Liu** - _UI Design_ - _No GitHub Account_
* **Samuel Stephen** - _Made scouting schema_ - [Saamstep](https://github.com/Saamstep)

See also the list of [contributors](https://github.com/Team3256/WB_Digital_Infrastructure/contributors) who participated in this project.
