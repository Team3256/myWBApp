//
//  SiriBridge.m
//  myWB
//
//  Created by John Panos on 2/16/18.
//  Copyright © 2018 John Panos. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(CalendarManager, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location)

@end
