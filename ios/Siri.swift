//
//  Siri.swift
//  myWB
//
//  Created by John Panos on 2/16/18.
//  Copyright © 2018 John Panos. All rights reserved.
//

import Foundation
import Intents

@objc(CalendarManager)
class CalendarManager: NSObject {
  
  @objc func addEvent(_ name: NSString, location: NSString) -> Void {
    // Date is ready to use!
    print("yooo this just worked")
    INPreferences.requestSiriAuthorization { (status) in
      switch status {
      case INSiriAuthorizationStatus.authorized:
        print("Authorized")
        break
      case INSiriAuthorizationStatus.denied:
        print("Denied")
        break
      default:
        print("Yikes")
      }
    }
  }
  
}
