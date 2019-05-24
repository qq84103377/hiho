//
//  CDVWechat.m
//  cordova-plugin-wechat
//
//  Created by xu.li on 12/23/13.
//
//

#import "CDVWechat.h"
#import "AppDelegate.h"
#import <AssetsLibrary/AssetsLibrary.h>
static int const MAX_THUMBNAIL_SIZE = 320;

@interface CDVWechat()
@property (nonatomic, strong) UIView *activityView;
@property (nonatomic, strong) UIActivityIndicatorView *activityIndicatorView;
@property (nonatomic, strong) NSMutableArray *imgArr;
@property (nonatomic, strong) CDVInvokedUrlCommand *saveImgCommand;

@end

@implementation CDVWechat

#pragma mark "API"
- (void)pluginInitialize {
    NSString* appId = [[self.commandDelegate settings] objectForKey:@"wechatappid"];
    
    if (appId && ![appId isEqualToString:self.wechatAppId]) {
        self.wechatAppId = appId;
        [WXApi registerApp: appId];
        
        NSLog(@"cordova-plugin-wechat has been initialized. Wechat SDK Version: %@. APP_ID: %@.", [WXApi getApiVersion], appId);
    }
}

- (void)isWXAppInstalled:(CDVInvokedUrlCommand *)command
{
    CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:[WXApi isWXAppInstalled]];
    
    [self.commandDelegate sendPluginResult:commandResult callbackId:command.callbackId];
}

- (void)share:(CDVInvokedUrlCommand *)command
{
    // if not installed
    if (![WXApi isWXAppInstalled])
    {
        [self failWithCallbackID:command.callbackId withMessage:@"未安装微信"];
        return ;
    }
    
    // check arguments
    NSDictionary *params = [command.arguments objectAtIndex:0];
    if (!params)
    {
        [self failWithCallbackID:command.callbackId withMessage:@"参数格式错误"];
        return ;
    }
    
    // save the callback id
    self.currentCallbackId = command.callbackId;
    
    SendMessageToWXReq* req = [[SendMessageToWXReq alloc] init];
    
    // check the scene
    if ([params objectForKey:@"scene"])
    {
        req.scene = (int)[[params objectForKey:@"scene"] integerValue];
    }
    else
    {
        req.scene = WXSceneTimeline;
    }
    
    // message or text?
    NSDictionary *message = [params objectForKey:@"message"];
    
    if (message)
    {
        id images = [[message objectForKey:@"media"] objectForKey:@"image"];
        NSMutableArray *imagesArr = [NSMutableArray array];
        if ([images isKindOfClass:[NSArray class]]) {
            [imagesArr addObjectsFromArray:images];
        }else if ([images isKindOfClass:[NSString class]]){
            [imagesArr addObject:images];
        }
        NSString *messageExt = [message objectForKey:@"messageExt"];
        if ([messageExt isEqualToString:@"SaveImg"]) {
            //保存图片
            [self saveImgToAlbum:message command:command];
            return;
        }
        
        
        NSString *description = [message objectForKey:@"description"];
        if (description.length) {
            //复制要发送的消息到粘贴板 用户使用的时候需要长按点击粘贴
            UIPasteboard *p = [UIPasteboard generalPasteboard];
            [p setString:description];
        }
        //一张图片的时候调用原来的
        if (imagesArr.count>1) {
            [self shareSomeImag:message command:command];
        }else{
            req.bText = NO;
            // async
            [self.commandDelegate runInBackground:^{
                req.message = [self buildSharingMessage:message];
                if (![WXApi sendReq:req])
                {
                    [self failWithCallbackID:command.callbackId withMessage:@"发送请求失败"];
                    self.currentCallbackId = nil;
                }
            }];
        }
        
        
    }
    else
    {
        req.bText = YES;
        req.text = [params objectForKey:@"text"];
        
        if (![WXApi sendReq:req])
        {
            [self failWithCallbackID:command.callbackId withMessage:@"发送请求失败"];
            self.currentCallbackId = nil;
        }
    }
}
//保存图片到本地相册
- (void)saveImgToAlbum:(NSDictionary *)message command:(CDVInvokedUrlCommand *)command
{
    //    [self activityViewShow];
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        id images = [[message objectForKey:@"media"] objectForKey:@"image"];
        NSMutableArray *imagesArr = [NSMutableArray array];
        if ([images isKindOfClass:[NSArray class]]) {
            [imagesArr addObjectsFromArray:images];
        }else if ([images isKindOfClass:[NSString class]]){
            [imagesArr addObject:images];
        }
        [self.imgArr removeAllObjects];
        self.saveImgCommand = command;
        for (NSString *imgUrlStr in imagesArr) {
            NSData *data = [self getNSDataFromURL:imgUrlStr];
            if (data) {
                UIImage *myImage = [UIImage imageWithData:data];
                if (myImage) {
                    [self.imgArr addObject:myImage];
                }
            }
        }
        if (self.imgArr.count) {
            [self saveImageToPhotos:[self.imgArr firstObject]];
        }else{
            dispatch_async(dispatch_get_main_queue(), ^{
                //@"保存图片失败";
                //loading
                //                [self activityViewStop];
                
            });
        }
    });
}
- (void)saveImageToPhotos:(UIImage *)savedImage
{
    UIImageWriteToSavedPhotosAlbum(savedImage, self, @selector(image:didFinishSavingWithError:contextInfo:), NULL);
    
}
- (void)image:(UIImage *)image didFinishSavingWithError: (NSError *) error contextInfo:(void *) contextInfo
{
    if(error){
        //跳回主队列执行
        dispatch_async(dispatch_get_main_queue(), ^{
            //@"保存图片失败";
            //loading
            //            [self activityViewStop];
            [self failWithCallbackID:self.saveImgCommand.callbackId withMessage:@"保存图片失败"];
            self.currentCallbackId = nil;
        });
    }else{
        [self.imgArr removeObject:image];
        if (self.imgArr.count) {
            [self saveImageToPhotos:[self.imgArr firstObject]];
        }else{
            //跳回主队列执行
            dispatch_async(dispatch_get_main_queue(), ^{
                // @"保存图片成功";
                //loading
                //                [self activityViewStop];
                [self successWithCallbackID:self.saveImgCommand.callbackId withMessage:@"保存图片成功"];
                self.currentCallbackId = nil;
            });
        }
    }
}
////分享多图
//- (void)activityViewStop
//{
//    if (self.activityView || self.activityIndicatorView) {
//        [self.activityIndicatorView stopAnimating];
//        [self.activityView removeFromSuperview];
//    }
//}
//- (void)activityViewShow
//{
//    UIViewController *vc = ((AppDelegate *)self.appDelegate).viewController;
//    CGFloat UIScreenWidth =  [[UIScreen mainScreen] bounds].size.width;
//    CGFloat UIScreenHeight =  [[UIScreen mainScreen] bounds].size.height;
//    self.activityView = [[UIView alloc] initWithFrame:CGRectMake(UIScreenWidth/2.0-50, UIScreenHeight/2.0-50, 100, 100)];
//    self.activityView.backgroundColor = [UIColor colorWithRed:0 green:0 blue:0 alpha:0.5];
//    self.activityView.layer.masksToBounds = YES;
//    self.activityView.layer.cornerRadius = 5;
//
//    self.activityIndicatorView =  [[UIActivityIndicatorView alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
//    [self.activityView addSubview:self.activityIndicatorView];
//    [vc.view addSubview:self.activityView];
//    self.activityIndicatorView.activityIndicatorViewStyle = UIActivityIndicatorViewStyleWhite;
//    [self.activityIndicatorView startAnimating];
//    [NSTimer scheduledTimerWithTimeInterval:30.0f target:self selector:@selector(activityViewStop) userInfo:nil repeats:YES];
//}
- (void)shareSomeImag:(NSDictionary *)message command:(CDVInvokedUrlCommand *)command
{
    UIViewController *vc = ((AppDelegate *)self.appDelegate).viewController;
    CGFloat UIScreenWidth =  [[UIScreen mainScreen] bounds].size.width;
    //loading
    //    [self activityViewShow];
    
    //异步并列执行
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        
        id images = [[message objectForKey:@"media"] objectForKey:@"image"];
        NSMutableArray *imagesArr = [NSMutableArray array];
        if ([images isKindOfClass:[NSArray class]]) {
            [imagesArr addObjectsFromArray:images];
        }else if ([images isKindOfClass:[NSString class]]){
            [imagesArr addObject:images];
        }
        NSArray *urlArr;
        //防止图片数太多
        if (imagesArr.count>9) {
            urlArr = [imagesArr subarrayWithRange:NSMakeRange(0, 9)];
        }else{
            urlArr = [NSArray arrayWithArray:imagesArr];
        }
        
        [CDVWechat downLoadImageUrlArr:urlArr completion:^(NSArray *fileUrlArr) {
            //跳回主队列执行
            dispatch_async(dispatch_get_main_queue(), ^{
                //loading
                //                [self activityViewStop];
                //在主队列中进行ui操作
                NSMutableArray *activityItems = [NSMutableArray array];
                for (NSString *fielUrl in fileUrlArr) {
                    NSData *date = [NSData dataWithContentsOfFile:fielUrl];
                    [activityItems addObject:date];
                }
                
                UIActivityViewController *activityVC = [[UIActivityViewController alloc]initWithActivityItems:activityItems applicationActivities:nil];
                activityVC.excludedActivityTypes = @[UIActivityTypePostToFacebook,UIActivityTypePostToTwitter,UIActivityTypePostToWeibo,UIActivityTypeMessage,UIActivityTypeMail,UIActivityTypePrint,UIActivityTypeCopyToPasteboard,UIActivityTypeAssignToContact,UIActivityTypeSaveToCameraRoll,UIActivityTypeAddToReadingList,UIActivityTypePostToFlickr,UIActivityTypePostToVimeo,UIActivityTypePostToTencentWeibo,UIActivityTypeAirDrop];
                activityVC.completionHandler = ^(UIActivityType activityType, BOOL completed){
                    //
                    if (completed == NO) {
                        [self failWithCallbackID:self.saveImgCommand.callbackId withMessage:@"分享失败"];
                        self.currentCallbackId = nil;
                    }else{
                        [self successWithCallbackID:self.saveImgCommand.callbackId withMessage:@"分享成功"];
                        self.currentCallbackId = nil;
                    }
                    //清除图片
                    [CDVWechat clearSharedCache];
                };
                
                if ([CDVWechat getIsIpad]) {
                    UIView *ipadShowView = [vc.view viewWithTag:999];
                    
                    UIPopoverController *popVc = [[UIPopoverController alloc] initWithContentViewController:activityVC];
                    //            vc.popVc = popVc;
                    popVc.popoverContentSize = CGSizeMake(410, 270);
                    [popVc presentPopoverFromRect:CGRectMake(UIScreenWidth*0.5, 0, 0, 0) inView:ipadShowView permittedArrowDirections:UIPopoverArrowDirectionDown animated:YES];
                }else{
                    [vc presentViewController:activityVC animated:YES completion:nil];
                }
            });
        }];
    });
}

- (void)sendAuthRequest:(CDVInvokedUrlCommand *)command
{
    
    SendAuthReq* req =[[SendAuthReq alloc] init];
    
    // scope
    if ([command.arguments count] > 0)
    {
        req.scope = [command.arguments objectAtIndex:0];
    }
    else
    {
        req.scope = @"snsapi_userinfo";
    }
    
    // state
    if ([command.arguments count] > 1)
    {
        req.state = [command.arguments objectAtIndex:1];
    }
    
    if ([WXApi sendAuthReq:req viewController:self.viewController delegate:self])
    {
        // save the callback id
        self.currentCallbackId = command.callbackId;
    }
    else
    {
        [self failWithCallbackID:command.callbackId withMessage:@"发送请求失败"];
    }
}

- (void)sendPaymentRequest:(CDVInvokedUrlCommand *)command
{
    // check arguments
    NSDictionary *params = [command.arguments objectAtIndex:0];
    if (!params)
    {
        [self failWithCallbackID:command.callbackId withMessage:@"参数格式错误"];
        return ;
    }
    
    // check required parameters
    NSArray *requiredParams;
    if ([params objectForKey:@"mch_id"])
    {
        requiredParams = @[@"mch_id", @"prepay_id", @"timestamp", @"nonce", @"sign", @"appid"];
    }
    else
    {
        requiredParams = @[@"partnerid", @"prepayid", @"timestamp", @"noncestr", @"sign", @"appid"];
    }
    
    for (NSString *key in requiredParams)
    {
        if (![params objectForKey:key])
        {
            [self failWithCallbackID:command.callbackId withMessage:@"参数格式错误"];
            return ;
        }
    }
    
    PayReq *req = [[PayReq alloc] init];
    
    NSString *appId = [params objectForKey:requiredParams[5]];
    if (appId && ![appId isEqualToString:self.wechatAppId]) {
        self.wechatAppId = appId;
        [WXApi registerApp: appId];
    }
    
    req.partnerId = [params objectForKey:requiredParams[0]];
    req.prepayId = [params objectForKey:requiredParams[1]];
    req.timeStamp = [[params objectForKey:requiredParams[2]] intValue];
    req.nonceStr = [params objectForKey:requiredParams[3]];
    req.package = @"Sign=WXPay";
    req.sign = [params objectForKey:requiredParams[4]];
    
    if ([WXApi sendReq:req])
    {
        // save the callback id
        self.currentCallbackId = command.callbackId;
    }
    else
    {
        [self failWithCallbackID:command.callbackId withMessage:@"发送请求失败"];
    }
}
- (void)chooseInvoiceFromWX:(CDVInvokedUrlCommand *)command
{
    NSDictionary *params = [command.arguments objectAtIndex:0];
    WXChooseInvoiceReq *req = [[WXChooseInvoiceReq alloc] init];
    req.cardSign = [params objectForKey:@"cardSign"];
    req.timeStamp = [[params objectForKey:@"timeStamp"] intValue];
    req.appID = [params objectForKey:@"appId"];
    req.nonceStr = [params objectForKey:@"nonceStr"];
    req.signType = [params objectForKey:@"signType"];
    
    if ([WXApi sendReq:req])
    {
        // save th e callback id
        self.currentCallbackId = command.callbackId;
    }
    else
    {
        [self failWithCallbackID:command.callbackId withMessage:@"发送请求失败"];
    }
    
}

- (void)jumpToBizProfile:(CDVInvokedUrlCommand *)command
{
    // check arguments
    NSDictionary *params = [command.arguments objectAtIndex:0];
    if (!params)
    {
        [self failWithCallbackID:command.callbackId withMessage:@"参数格式错误"];
        return ;
    }
    
    // check required parameters
    NSArray *requiredParams;
    requiredParams = @[@"type", @"info"];
    
    for (NSString *key in requiredParams)
    {
        if (![params objectForKey:key])
        {
            [self failWithCallbackID:command.callbackId withMessage:@"参数格式错误"];
            return ;
        }
    }
    JumpToBizProfileReq *req = [JumpToBizProfileReq new];
    NSString *bizType =  [params objectForKey:requiredParams[0]];
    
    if ([bizType isEqualToString:@"Normal"]) {
        req.profileType = WXBizProfileType_Normal;
        req.username = [params objectForKey:requiredParams[1]];
    } else {
        req.profileType = WXBizProfileType_Device;
        req.extMsg = [params objectForKey:requiredParams[1]];
    }
    
    if ([WXApi sendReq:req])
    {
        // save the callback id
        self.currentCallbackId = command.callbackId;
    }
    else
    {
        [self failWithCallbackID:command.callbackId withMessage:@"发送请求失败"];
    }
}

- (void)jumpToWechat:(CDVInvokedUrlCommand *)command
{
    // check arguments
    NSString *url = [command.arguments objectAtIndex:0];
    if (!url || ![url hasPrefix:@"weixin://"])
    {
        [self failWithCallbackID:command.callbackId withMessage:@"参数格式错误"];
        return ;
    }
    
    NSURL *formatUrl = [NSURL URLWithString:[url stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    if ([[UIApplication sharedApplication] canOpenURL:formatUrl]) {
        [[UIApplication sharedApplication] openURL:formatUrl];
    } else{
        [self failWithCallbackID:command.callbackId withMessage:@"未安装微信或其他错误"];
    }
    return ;
}



#pragma mark "WXApiDelegate"

/**
 * Not implemented
 */
- (void)onReq:(BaseReq *)req
{
    NSLog(@"%@", req);
}

- (void)onResp:(BaseResp *)resp
{
    BOOL success = NO;
    NSString *message = @"Unknown";
    NSDictionary *response = nil;
    
    switch (resp.errCode)
    {
        case WXSuccess:
            success = YES;
            break;
            
        case WXErrCodeCommon:
            message = @"普通错误";
            break;
            
        case WXErrCodeUserCancel:
            message = @"用户点击取消并返回";
            break;
            
        case WXErrCodeSentFail:
            message = @"发送失败";
            break;
            
        case WXErrCodeAuthDeny:
            message = @"授权失败";
            break;
            
        case WXErrCodeUnsupport:
            message = @"微信不支持";
            break;
            
        default:
            message = @"未知错误";
    }
    
    if (success)
    {
        if ([resp isKindOfClass:[SendAuthResp class]])
        {
            // fix issue that lang and country could be nil for iPhone 6 which caused crash.
            SendAuthResp* authResp = (SendAuthResp*)resp;
            response = @{
                         @"code": authResp.code != nil ? authResp.code : @"",
                         @"state": authResp.state != nil ? authResp.state : @"",
                         @"lang": authResp.lang != nil ? authResp.lang : @"",
                         @"country": authResp.country != nil ? authResp.country : @"",
                         };
            
            CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
            
            [self.commandDelegate sendPluginResult:commandResult callbackId:self.currentCallbackId];
        }
        else if([resp isKindOfClass:[WXChooseInvoiceResp class]]){
            WXChooseInvoiceResp* invoiceResp = (WXChooseInvoiceResp *)resp;
            
            //            response = @{
            //                         @"data":invoiceResp.cardAry
            //                         }
            NSMutableArray *arrM = [[NSMutableArray alloc] init];
            NSDictionary *mutableDic = nil;
            for(WXInvoiceItem *invoiceItem in invoiceResp.cardAry){
                mutableDic = @{
                               @"cardId": invoiceItem.cardId,
                               @"encryptCode": invoiceItem.encryptCode,
                               };
                [arrM addObject:mutableDic];
            }
            response = @{
                         @"data": arrM
                         };
            NSLog(@"response======= %@", response);
            CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
            [self.commandDelegate sendPluginResult:commandResult callbackId:self.currentCallbackId];
        }
        else
        {
            [self successWithCallbackID:self.currentCallbackId];
        }
    }
    else
    {
        [self failWithCallbackID:self.currentCallbackId withMessage:message];
    }
    
    [self pluginInitialize];
    self.currentCallbackId = nil;
}


#pragma mark "CDVPlugin Overrides"

- (void)handleOpenURL:(NSNotification *)notification
{
    NSURL* url = [notification object];
    
    if ([url isKindOfClass:[NSURL class]] && [url.scheme isEqualToString:self.wechatAppId])
    {
        [WXApi handleOpenURL:url delegate:self];
    }
}

#pragma mark "Private methods"

- (WXMediaMessage *)buildSharingMessage:(NSDictionary *)message
{
    WXMediaMessage *wxMediaMessage = [WXMediaMessage message];
    wxMediaMessage.title = [message objectForKey:@"title"];
    wxMediaMessage.description = [message objectForKey:@"description"];
    wxMediaMessage.mediaTagName = [message objectForKey:@"mediaTagName"];
    wxMediaMessage.messageExt = [message objectForKey:@"messageExt"];
    wxMediaMessage.messageAction = [message objectForKey:@"messageAction"];
    if ([message objectForKey:@"thumb"])
    {
        [wxMediaMessage setThumbImage:[self getUIImageFromURL:[message objectForKey:@"thumb"]]];
    }
    
    // media parameters
    id mediaObject = nil;
    NSDictionary *media = [message objectForKey:@"media"];
    
    // check types
    NSInteger type = [[media objectForKey:@"type"] integerValue];
    switch (type)
    {
        case CDVWXSharingTypeApp:
            mediaObject = [WXAppExtendObject object];
            ((WXAppExtendObject*)mediaObject).extInfo = [media objectForKey:@"extInfo"];
            ((WXAppExtendObject*)mediaObject).url = [media objectForKey:@"url"];
            break;
            
        case CDVWXSharingTypeEmotion:
            mediaObject = [WXEmoticonObject object];
            ((WXEmoticonObject*)mediaObject).emoticonData = [self getNSDataFromURL:[media objectForKey:@"emotion"]];
            break;
            
        case CDVWXSharingTypeFile:
            mediaObject = [WXFileObject object];
            ((WXFileObject*)mediaObject).fileData = [self getNSDataFromURL:[media objectForKey:@"file"]];
            ((WXFileObject*)mediaObject).fileExtension = [media objectForKey:@"fileExtension"];
            break;
            
        case CDVWXSharingTypeImage:
        {
            mediaObject = [WXImageObject object];
            id images = [media objectForKey:@"image"];
            NSString *imgUrlStr = @"";
            if ([images isKindOfClass:[NSArray class]]) {
                imgUrlStr = [images firstObject];
            }else if ([images isKindOfClass:[NSString class]]){
                imgUrlStr = images;
            }
            ((WXImageObject*)mediaObject).imageData = [self getNSDataFromURL:imgUrlStr];
        }
            
            break;
            
        case CDVWXSharingTypeMusic:
            mediaObject = [WXMusicObject object];
            ((WXMusicObject*)mediaObject).musicUrl = [media objectForKey:@"musicUrl"];
            ((WXMusicObject*)mediaObject).musicDataUrl = [media objectForKey:@"musicDataUrl"];
            break;
            
        case CDVWXSharingTypeVideo:
            mediaObject = [WXVideoObject object];
            ((WXVideoObject*)mediaObject).videoUrl = [media objectForKey:@"videoUrl"];
            break;
            
        case CDVWXSharingTypeWebPage:
        default:
            mediaObject = [WXWebpageObject object];
            ((WXWebpageObject *)mediaObject).webpageUrl = [media objectForKey:@"webpageUrl"];
    }
    
    wxMediaMessage.mediaObject = mediaObject;
    return wxMediaMessage;
}

- (NSData *)getNSDataFromURL:(NSString *)url
{
    NSData *data = nil;
    
    if ([url hasPrefix:@"http://"] || [url hasPrefix:@"https://"])
    {
        data = [NSData dataWithContentsOfURL:[NSURL URLWithString:url]];
    }
    else if ([url hasPrefix:@"data:image"])
    {
        // a base 64 string
        NSURL *base64URL = [NSURL URLWithString:url];
        data = [NSData dataWithContentsOfURL:base64URL];
    }
    else if ([url rangeOfString:@"temp:"].length != 0)
    {
        url =  [NSTemporaryDirectory() stringByAppendingPathComponent:[url componentsSeparatedByString:@"temp:"][1]];
        data = [NSData dataWithContentsOfFile:url];
    }
    else
    {
        // local file
        url = [[NSBundle mainBundle] pathForResource:[url stringByDeletingPathExtension] ofType:[url pathExtension]];
        data = [NSData dataWithContentsOfFile:url];
    }
    
    return data;
}

- (UIImage *)getUIImageFromURL:(NSString *)url
{
    NSData *data = [self getNSDataFromURL:url];
    UIImage *image = [UIImage imageWithData:data];
    
    if (image.size.width > MAX_THUMBNAIL_SIZE || image.size.height > MAX_THUMBNAIL_SIZE)
    {
        CGFloat width = 0;
        CGFloat height = 0;
        
        // calculate size
        if (image.size.width > image.size.height)
        {
            width = MAX_THUMBNAIL_SIZE;
            height = width * image.size.height / image.size.width;
        }
        else
        {
            height = MAX_THUMBNAIL_SIZE;
            width = height * image.size.width / image.size.height;
        }
        
        // scale it
        UIGraphicsBeginImageContext(CGSizeMake(width, height));
        [image drawInRect:CGRectMake(0, 0, width, height)];
        UIImage *scaled = UIGraphicsGetImageFromCurrentImageContext();
        UIGraphicsEndImageContext();
        
        return scaled;
    }
    
    return image;
}

- (void)successWithCallbackID:(NSString *)callbackID
{
    [self successWithCallbackID:callbackID withMessage:@"OK"];
}

- (void)successWithCallbackID:(NSString *)callbackID withMessage:(NSString *)message
{
    CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:message];
    [self.commandDelegate sendPluginResult:commandResult callbackId:callbackID];
}

- (void)failWithCallbackID:(NSString *)callbackID withError:(NSError *)error
{
    [self failWithCallbackID:callbackID withMessage:[error localizedDescription]];
}
- (void)failWithCallbackID:(NSString *)callbackID withMessage:(NSString *)message
{
    CDVPluginResult *commandResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:message];
    [self.commandDelegate sendPluginResult:commandResult callbackId:callbackID];
}


//-----------
+ (BOOL)getIsIpad
{
    NSString *deviceType = [UIDevice currentDevice].model;
    if([deviceType isEqualToString:@"iPhone"]) {
        //iPhone
        return NO;
    }
    else if([deviceType isEqualToString:@"iPod touch"]) {
        //iPod Touch
        return NO;
    }
    else if([deviceType isEqualToString:@"iPad"]) {
        //iPad
        return YES;
    }
    return NO;
}

//下载图片数组，为了防止顺序，一个一个下载
+ (void)downLoadImageUrlArr:(NSArray *)imgUrlArr completion:(void (^)(NSArray *fileUrlArr))completion;

{
    if (imgUrlArr.count == 0) {
        if (completion) {
            completion(nil);
        }
    }
    __block NSInteger downIndex = 0;
    __block NSMutableArray *fileArr = [NSMutableArray array];
    for (int i = 0 ;i<imgUrlArr.count;i++) {
        [fileArr addObject:@""];
        NSString *imgUrl = imgUrlArr[i];
        [self downLoadImageUrlStr:imgUrl index:i completion:^(NSString *fileUrl, UIImage *newImage) {
            downIndex += 1;
            [fileArr replaceObjectAtIndex:i withObject:fileUrl];
            if (downIndex == imgUrlArr.count) {
                if (completion) {
                    completion(fileArr);
                }
            }
        }];
    }
}



+ (void)downLoadImageUrlStr:(NSString *)imgUrl index:(NSInteger)index completion:(void (^)(NSString *fileUrl, UIImage *newImage))completion
{
    if (imgUrl == nil) {
        if (completion) {
            completion(nil,nil);
        }
    }
    [self sdDownImage:imgUrl completion:^(UIImage *image) {
        [self dealImage:image index:index completion:^(NSString *fileUrl, UIImage *newImage) {
            if (completion) {
                completion(fileUrl,newImage);
            }
        }];
    }];
}
+ (void)dealImage:(UIImage *)image index:(NSInteger)index completion:(void (^)(NSString *fileUrl, UIImage *newImage))completion
{
    //暂时不处理图片，如果需要再裁剪
    UIImage *newImage = image;
    NSString *path = [self sharedCachePath];
    if (path.length){
        path = [self writeImage:newImage path:path index:index];
    }
    if (completion) {
        completion(path, newImage);
    }
}
+ (NSString *)writeImage:(UIImage *)image path:(NSString *)path index:(NSInteger)index
{
    int alphaInfo = CGImageGetAlphaInfo(image.CGImage);
    BOOL hasAlpha = !(alphaInfo == kCGImageAlphaNone ||
                      alphaInfo == kCGImageAlphaNoneSkipFirst ||
                      alphaInfo == kCGImageAlphaNoneSkipLast);
    BOOL imageIsPng = hasAlpha;
    
    NSData *data = UIImageJPEGRepresentation(image, (CGFloat)0.8);
    if (imageIsPng) {
        path = [path stringByAppendingPathComponent:[NSString stringWithFormat:@"shareToWechat_%zd.png",index]];
    }
    else {
        path = [path stringByAppendingPathComponent:[NSString stringWithFormat:@"shareToWechat_%zd.jpg",index]];
    }
    NSURL *fileUrl = [NSURL fileURLWithPath:path];
    [data writeToURL:fileUrl atomically:YES];
    return path;
}

+ (NSString *)sharedCachePath
{
    NSString *cache = NSSearchPathForDirectoriesInDomains(NSCachesDirectory, NSUserDomainMask, YES).lastObject;
    NSString *sharedCache = [cache stringByAppendingPathComponent:@"sharedCache"];
    BOOL isDir = NO;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    BOOL existed = [fileManager fileExistsAtPath:sharedCache isDirectory:&isDir];
    if (!(isDir == YES && existed == YES)) {
        NSError *error;
        [fileManager createDirectoryAtPath:sharedCache withIntermediateDirectories:YES attributes:nil error:&error];
        if (!error) {
            
        }
    }else{
        
    }
    return sharedCache;
}


+ (void)sdDownImage:(NSString *)imgUrl completion:(void (^)(UIImage *image))completion
{
    
    NSURL *imageURL = [NSURL URLWithString:imgUrl];
    //下载图片
    NSData *imageData = [NSData dataWithContentsOfURL:imageURL];
    UIImage *image = [UIImage imageWithData:imageData];
    if (completion) {
        completion(image);
    }
}
/**
 清空图片缓存
 */
+ (void)clearSharedCache
{
    NSString *sharedCache = [self sharedCachePath];
    BOOL isDir = NO;
    NSFileManager *fileManager = [NSFileManager defaultManager];
    BOOL existed = [fileManager fileExistsAtPath:sharedCache isDirectory:&isDir];
    if (existed) {
        if (isDir) {
            NSArray *contents = [fileManager contentsOfDirectoryAtPath:sharedCache error:NULL];
            NSEnumerator *e = [contents objectEnumerator];
            NSString *filename;
            while ((filename = [e nextObject])) {
                [fileManager removeItemAtPath:[sharedCache stringByAppendingPathComponent:filename] error:NULL];
            }
        }else{
            [fileManager removeItemAtPath:sharedCache error:NULL];
        }
    }
}
- (NSMutableArray *)imgArr
{
    if (_imgArr == nil) {
        _imgArr = [NSMutableArray array];
    }
    return _imgArr;
}
@end

