#import "AppDelegate.h"
#import "RNCConfig.h"
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h>
#import <BrazeKit/BrazeKit-Swift.h>
#import "BrazeReactBridge.h"
#import <Firebase.h>
#import <React/RCTLinkingManager.h>


@implementation AppDelegate
NSString *googleApiKey = [RNCConfig envFor:@"GOOGLE_MAPS_API_KEY_IOS"];

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:googleApiKey]; // add this line using the api key obtained from Google Console

  // Setup Braze
  BRZConfiguration *configuration = [[BRZConfiguration alloc] initWithApiKey:@"e7422f92-8f4f-4238-bc40-cc2039f3eef4"
      endpoint:@"sdk.iad-05.braze.com"];
  configuration.push.automation = [[BRZConfigurationPushAutomation alloc] initEnablingAllAutomations:YES];
  configuration.push.automation.requestAuthorizationAtLaunch = NO;


  // Enable logging and customize the configuration here.
  Braze *braze = [BrazeReactBridge initBraze:configuration];
  AppDelegate.braze = braze;
  
  [FIRApp configure];
  self.moduleName = @"SwagPersonalAppExample";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL)application:(UIApplication *)application
   openURL:(NSURL *)url
   options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
{
  return [RCTLinkingManager application:application openURL:url options:options];
}

#pragma mark - AppDelegate.braze

static Braze *_braze = nil;

+ (Braze *)braze {
  return _braze;
}

+ (void)setBraze:(Braze *)braze {
  _braze = braze;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self getBundleURL];
}
 
- (NSURL *)getBundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

