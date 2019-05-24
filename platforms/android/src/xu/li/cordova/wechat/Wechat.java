package xu.li.cordova.wechat;

import android.Manifest;
import android.app.Activity;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.os.StrictMode;
import android.support.annotation.RequiresApi;
import android.text.TextUtils;
import android.util.Base64;
import android.util.Log;
import android.webkit.URLUtil;
import android.widget.Toast;

import com.nordnetab.chcp.main.utils.PermissionRationDialog;
import com.tbruyelle.rxpermissions.RxPermissions;
import com.tencent.mm.opensdk.modelbiz.ChooseCardFromWXCardPackage;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.modelmsg.WXAppExtendObject;
import com.tencent.mm.opensdk.modelmsg.WXEmojiObject;
import com.tencent.mm.opensdk.modelmsg.WXFileObject;
import com.tencent.mm.opensdk.modelmsg.WXImageObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXMusicObject;
import com.tencent.mm.opensdk.modelmsg.WXTextObject;
import com.tencent.mm.opensdk.modelmsg.WXVideoObject;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import rx.functions.Action1;

public class Wechat extends CordovaPlugin {

    public static final String TAG = "Cordova.Plugin.Wechat";

    public static final String PREFS_NAME = "Cordova.Plugin.Wechat";
    public static final String WXAPPID_PROPERTY_KEY = "wechatappid";

    public static final String ERROR_WECHAT_NOT_INSTALLED = "未安装微信";
    public static final String ERROR_INVALID_PARAMETERS = "参数格式错误";
    public static final String ERROR_SEND_REQUEST_FAILED = "发送请求失败";
    public static final String ERROR_WECHAT_RESPONSE_COMMON = "普通错误";
    public static final String ERROR_WECHAT_RESPONSE_USER_CANCEL = "用户点击取消并返回";
    public static final String ERROR_WECHAT_RESPONSE_SENT_FAILED = "发送失败";
    public static final String ERROR_WECHAT_RESPONSE_AUTH_DENIED = "授权失败";
    public static final String ERROR_WECHAT_RESPONSE_UNSUPPORT = "微信不支持";
    public static final String ERROR_WECHAT_RESPONSE_UNKNOWN = "未知错误";

    public static final String EXTERNAL_STORAGE_IMAGE_PREFIX = "external://";

    public static final String KEY_ARG_MESSAGE = "message";
    public static final String KEY_ARG_SCENE = "scene";
    public static final String KEY_ARG_TEXT = "text";
    public static final String KEY_ARG_MESSAGE_TITLE = "title";
    public static final String KEY_ARG_MESSAGE_DESCRIPTION = "description";
    public static final String KEY_ARG_MESSAGE_THUMB = "thumb";
    public static final String KEY_ARG_MESSAGE_MEDIA = "media";
    public static final String KEY_ARG_MESSAGE_MEDIA_TYPE = "type";
    public static final String KEY_ARG_MESSAGE_MEDIA_WEBPAGEURL = "webpageUrl";
    public static final String KEY_ARG_MESSAGE_MEDIA_IMAGE = "image";
    public static final String KEY_ARG_MESSAGE_MEDIA_TEXT = "text";
    public static final String KEY_ARG_MESSAGE_MEDIA_MUSICURL = "musicUrl";
    public static final String KEY_ARG_MESSAGE_MEDIA_MUSICDATAURL = "musicDataUrl";
    public static final String KEY_ARG_MESSAGE_MEDIA_VIDEOURL = "videoUrl";
    public static final String KEY_ARG_MESSAGE_MEDIA_FILE = "file";
    public static final String KEY_ARG_MESSAGE_MEDIA_EMOTION = "emotion";
    public static final String KEY_ARG_MESSAGE_MEDIA_EXTINFO = "extInfo";
    public static final String KEY_ARG_MESSAGE_MEDIA_URL = "url";

    public static final int TYPE_WECHAT_SHARING_APP = 1;
    public static final int TYPE_WECHAT_SHARING_EMOTION = 2;
    public static final int TYPE_WECHAT_SHARING_FILE = 3;
    public static final int TYPE_WECHAT_SHARING_IMAGE = 4;
    public static final int TYPE_WECHAT_SHARING_MUSIC = 5;
    public static final int TYPE_WECHAT_SHARING_VIDEO = 6;
    public static final int TYPE_WECHAT_SHARING_WEBPAGE = 7;
    public static final int TYPE_WECHAT_SHARING_TEXT = 8;

    public static final int SCENE_SESSION = 0;
    public static final int SCENE_TIMELINE = 1;
    public static final int SCENE_FAVORITE = 2;

    public static final int MAX_THUMBNAIL_SIZE = 320;

    protected static CallbackContext currentCallbackContext;
    protected static IWXAPI wxAPI;
    protected static String appId;

    @Override
    protected void pluginInitialize() {

        super.pluginInitialize();

        String id = getAppId();

        // save app id
        saveAppId(cordova.getActivity(), id);

        // init api
        initWXAPI();

        Log.d(TAG, "plugin initialized.");
    }

    protected void initWXAPI() {
        IWXAPI api = getWxAPI(cordova.getActivity());

        if (api != null) {
            api.registerApp(getAppId());
        }
    }

    /**
     * Get weixin api
     *
     * @param ctx
     * @return
     */
    public static IWXAPI getWxAPI(Context ctx) {
        if (wxAPI == null) {
            String appId = getSavedAppId(ctx);

            if (!appId.isEmpty()) {
                wxAPI = WXAPIFactory.createWXAPI(ctx, appId, true);
            }
        }

        return wxAPI;
    }

    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        Log.d(TAG, String.format("%s is called. Callback ID: %s.", action, callbackContext.getCallbackId()));

        if (action.equals("share")) {
            return share(args, callbackContext);
        } else if (action.equals("sendAuthRequest")) {
            return sendAuthRequest(args, callbackContext);
        } else if (action.equals("sendPaymentRequest")) {
            return sendPaymentRequest(args, callbackContext);
        } else if (action.equals("isWXAppInstalled")) {
            return isInstalled(callbackContext);
        } else if (action.equals("chooseInvoiceFromWX")) {
            return chooseInvoiceFromWX(args, callbackContext);
        }

        return false;
    }

    /**
     * android 7.0系统解决拍照的问题
     */
    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR2)
    private void initPhotoError() {
        StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());
        builder.detectFileUriExposure();
    }


    private boolean shareLogic(CordovaArgs args, final CallbackContext callbackContext) throws Exception {

        /**
         * 解决 exposed beyond app through ClipData.Item.getUri()的问题
         */
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
            initPhotoError();
        }

        JSONObject jsonObject = args.getJSONObject(0);
        Log.e("Hzhddd", jsonObject + "");
        JSONObject message = jsonObject.getJSONObject("message");
        List<String> filePathList = new ArrayList<>();
        //获取分享描述
        String description = message.getString("description");
        //复制描述内容到粘贴板
        cordova.getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Util.copyTextToClipboard(cordova.getActivity(), description);
            }
        });
        //获取图片分享到哪里
        String messageExt = message.getString("messageExt");
        //获取图片地址
        JSONArray image = message.getJSONObject("media").getJSONArray("image");

        // 上下文
        Context context = cordova.getActivity();

        // 本地图片到集合，因为有base64的图片
        List<String> localList = new ArrayList<>();

        for (int i = 0; i < image.length(); i++) {
            try {
                String url = image.getString(i);
                if (TextUtils.isEmpty(url)) {
                    continue;
                }
                if (url.startsWith("http://") || url.startsWith("https://")) {
                    filePathList.add(image.getString(i));
                } else {
                    url = Util.saveBase64File(context, url, !"SaveImg".equals(messageExt));
                    if (!TextUtils.isEmpty(url)) {
                        localList.add(url);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        if (filePathList != null && !filePathList.isEmpty()) {
            //下载图片到本地 (非SaveImg的都保存在缓存中)
            Util.downloadAndCacheFile(cordova.getActivity(), !"SaveImg".equals(messageExt),
                    filePathList, imageList -> {
                        imageList.addAll(localList);
                        new Handler(Looper.getMainLooper()).post(new Runnable() {
                            @Override
                            public void run() {
                                if ("Friend".equals(messageExt)) {
                                    final IWXAPI api = getWxAPI(cordova.getActivity());
                                    //检测是否安装微信
                                    if (!api.isWXAppInstalled()) {
                                        callbackContext.error(ERROR_WECHAT_NOT_INSTALLED);
                                        return;
                                    }
                                    //分享给朋友
                                    shareImageToWechatFriend(cordova.getActivity(), description, imageList);
                                } else if ("Circle".equals(messageExt)) {
                                    final IWXAPI api = getWxAPI(cordova.getActivity());
                                    //检测是否安装微信
                                    if (!api.isWXAppInstalled()) {
                                        callbackContext.error(ERROR_WECHAT_NOT_INSTALLED);
                                        return;
                                    }
                                    //分享到朋友圈
                                    shareImageToWechatCircle(cordova.getActivity(), description, imageList);
                                } else {
                                    //保存图片到相册
                                    try {
                                        Util.saveImageToGallery(cordova.getActivity(), imageList);
                                    } catch (FileNotFoundException e) {
                                        e.printStackTrace();
                                        callbackContext.error("图片保存失败");
                                    }
                                }
                            }
                        });

                    });
        } else {
            // 只有base64图片的情况
            if (!localList.isEmpty()) {
                new Handler(Looper.getMainLooper()).post(new Runnable() {
                    @Override
                    public void run() {
                        if ("Friend".equals(messageExt)) {
                            final IWXAPI api = getWxAPI(cordova.getActivity());
                            //检测是否安装微信
                            if (!api.isWXAppInstalled()) {
                                callbackContext.error(ERROR_WECHAT_NOT_INSTALLED);
                                return;
                            }
                            //分享给朋友
                            shareImageToWechatFriend(cordova.getActivity(), description, localList);
                        } else if ("Circle".equals(messageExt)) {
                            final IWXAPI api = getWxAPI(cordova.getActivity());
                            //检测是否安装微信
                            if (!api.isWXAppInstalled()) {
                                callbackContext.error(ERROR_WECHAT_NOT_INSTALLED);
                                return;
                            }
                            //分享到朋友圈
                            shareImageToWechatCircle(cordova.getActivity(), description, localList);
                        } else {
                            //保存图片到相册
                            try {
                                Util.saveImageToGallery(cordova.getActivity(), localList);
                            } catch (FileNotFoundException e) {
                                e.printStackTrace();
                                callbackContext.error("图片保存失败");
                            }
                        }
                    }
                });
            }
        }


//        final IWXAPI api = getWxAPI(cordova.getActivity());
//
//        // check if installed
//        if (!api.isWXAppInstalled()) {
//            callbackContext.error(ERROR_WECHAT_NOT_INSTALLED);
//            return true;
//        }
//
//        // check if # of arguments is correct
//        final JSONObject params;
//        try {
//            params = args.getJSONObject(0);
//        } catch (JSONException e) {
//            callbackContext.error(ERROR_INVALID_PARAMETERS);
//            return true;
//        }
//
//        final SendMessageToWX.Req req = new SendMessageToWX.Req();
//        req.transaction = buildTransaction();
//
//        if (params.has(KEY_ARG_SCENE)) {
//            switch (params.getInt(KEY_ARG_SCENE)) {
//                case SCENE_FAVORITE:
//                    req.scene = SendMessageToWX.Req.WXSceneFavorite;
//                    break;
//                case SCENE_TIMELINE:
//                    req.scene = SendMessageToWX.Req.WXSceneTimeline;
//                    break;
//                case SCENE_SESSION:
//                    req.scene = SendMessageToWX.Req.WXSceneSession;
//                    break;
//                default:
//                    req.scene = SendMessageToWX.Req.WXSceneTimeline;
//            }
//        } else {
//            req.scene = SendMessageToWX.Req.WXSceneTimeline;
//        }
//
//        // run in background
//        cordova.getThreadPool().execute(new Runnable() {
//
//            @Override
//            public void run() {
//                try {
//                    req.message = buildSharingMessage(params);
//                } catch (JSONException e) {
//                    Log.e(TAG, "Failed to build sharing message.", e);
//
//                    // clear callback context
//                    currentCallbackContext = null;
//
//                    // send json exception error
//                    callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.JSON_EXCEPTION));
//                }
//
//                if (api.sendReq(req)) {
//                    Log.i(TAG, "Message has been sent successfully.");
//                } else {
//                    Log.i(TAG, "Message has been sent unsuccessfully.");
//
//                    // clear callback context
//                    currentCallbackContext = null;
//
//                    // send error
//                    callbackContext.error(ERROR_SEND_REQUEST_FAILED);
//                }
//            }
//        });

        // send no result
        try {
            sendNoResultPluginResult(callbackContext);
            callbackContext.success();
        } catch (Exception e) {
            e.printStackTrace();
        }

        isDownFinish = true;

        return true;
    }


    private boolean isDownFinish = true;

    Handler mHandler = new Handler();

    protected boolean share(CordovaArgs args, final CallbackContext callbackContext)
            throws JSONException {


        Activity activity = cordova.getActivity();

        activity.runOnUiThread(() -> {
            RxPermissions rxPermissions = new RxPermissions(activity);
            rxPermissions.request(Manifest.permission.WRITE_EXTERNAL_STORAGE,
                    Manifest.permission.READ_PHONE_STATE)
                    .subscribe(new Action1<Boolean>() {
                        @Override
                        public void call(Boolean aBoolean) {
                            if (aBoolean) {
                                if (!isDownFinish) {
                                    return;
                                }
                                isDownFinish = false;
                                new Thread(() -> {
                                    try {
                                        shareLogic(args, callbackContext);
                                    } catch (Exception e) {
                                        e.printStackTrace();
                                        Log.e("Hzhpermission.granted", " " + e);
                                    }

                                }).start();
                            } else {
                                new PermissionRationDialog(cordova.getActivity()).create().show();
                            }
                        }
                    });

//            rxPermissions.requestEach(Manifest.permission.WRITE_EXTERNAL_STORAGE,
//                    Manifest.permission.READ_PHONE_STATE)
//                    .subscribe(permission -> {
//                        if (permission.granted) {
//
//                            Log.e("Hzhpermission.granted", " " + Thread.currentThread());
//                            if (!isDownFinish) {
//                                return;
//                            }
//                            isDownFinish = false;
//                            new Thread(() -> {
//                                try {
//                                    shareLogic(args, callbackContext);
//                                } catch (Exception e) {
//                                    e.printStackTrace();
//                                    Log.e("Hzhpermission.granted", " " + e);
//                                }
//
//                            }).start();
//
//                        } else if (permission.shouldShowRequestPermissionRationale) {
//                            Toast.makeText(cordova.getActivity(), "权限被拒绝!", Toast.LENGTH_LONG).show();
//                        } else {
//                            new PermissionRationDialog(cordova.getActivity()).create().show();
//                        }
//                    });
        });

        return true;
    }

    /**
     * 分享图片到朋友圈
     *
     * @param context      上下文环境
     * @param description  描述（直接分享图片到微信好友的功能都没有实现带describe的图片分享功能,所以不会显示出来）
     * @param filePathList 图片本地路径
     */
    public void shareImageToWechatCircle(Context context, String description, List<String> filePathList) {
        if (filePathList == null || filePathList.isEmpty()) {
            return;
        }
        Intent intent = new Intent();
        ComponentName comp = new ComponentName("com.tencent.mm",
                "com.tencent.mm.ui.tools.ShareToTimeLineUI");
        intent.setComponent(comp);
        intent.setAction(Intent.ACTION_SEND_MULTIPLE);
        intent.setType("image/*");
        intent.putExtra("Kdescription", description);
        ArrayList<Uri> imageUris = new ArrayList<>();
        if (filePathList != null) {
            for (String path : filePathList) {
                if (!TextUtils.isEmpty(path)) {
                    imageUris.add(Uri.fromFile(new File(path)));
                }
            }
        }
        intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, imageUris);
        context.startActivity(intent);
    }

    /**
     * 分享图片给朋友
     *
     * @param context      上下文环境
     * @param description  描述（直接分享图片到微信好友的功能都没有实现带describe的图片分享功能,所以不会显示出来）
     * @param filePathList 图片本地路径
     */
    public void shareImageToWechatFriend(Context context, String description, List<String> filePathList) {
        if (filePathList == null || filePathList.isEmpty()) {
            return;
        }
        Intent intent = new Intent();
        ComponentName comp = new ComponentName("com.tencent.mm",
                "com.tencent.mm.ui.tools.ShareImgUI");
        intent.setComponent(comp);
        intent.setAction(Intent.ACTION_SEND_MULTIPLE);
        intent.setType("image/*");
        intent.putExtra("Kdescription", description);
        ArrayList<Uri> imageUris = new ArrayList<>();
        if (filePathList != null) {
            for (String path : filePathList) {
                if (!TextUtils.isEmpty(path)) {
                    imageUris.add(Uri.fromFile(new File(path)));
                }
            }
        }
        intent.putParcelableArrayListExtra(Intent.EXTRA_STREAM, imageUris);
        context.startActivity(intent);
    }

    protected boolean sendAuthRequest(CordovaArgs args, CallbackContext callbackContext) {
        final IWXAPI api = getWxAPI(cordova.getActivity());

        final SendAuth.Req req = new SendAuth.Req();
        try {
            req.scope = args.getString(0);
            req.state = args.getString(1);
        } catch (JSONException e) {
            Log.e(TAG, e.getMessage());

            req.scope = "snsapi_userinfo";
            req.state = "wechat";
        }

        if (api.sendReq(req)) {
            Log.i(TAG, "Auth request has been sent successfully.");

            // send no result
            sendNoResultPluginResult(callbackContext);
        } else {
            Log.i(TAG, "Auth request has been sent unsuccessfully.");

            // send error
            callbackContext.error(ERROR_SEND_REQUEST_FAILED);
        }

        return true;
    }

    protected boolean sendPaymentRequest(CordovaArgs args, CallbackContext callbackContext) {

        // check if # of arguments is correct
        final JSONObject params;
        try {
            params = args.getJSONObject(0);
        } catch (JSONException e) {
            callbackContext.error(ERROR_INVALID_PARAMETERS);
            return true;
        }

        PayReq req = new PayReq();

        try {
            final String appid = params.getString("appid");
            final String savedAppid = getAppId();
            if (!savedAppid.equals(appid)) {
                this.saveAppId(cordova.getActivity(), appid);
            }

            req.appId = appid;
            req.partnerId = params.has("mch_id") ? params.getString("mch_id") : params.getString("partnerid");
            req.prepayId = params.has("prepay_id") ? params.getString("prepay_id") : params.getString("prepayid");
            req.nonceStr = params.has("nonce") ? params.getString("nonce") : params.getString("noncestr");
            req.timeStamp = params.getString("timestamp");
            req.sign = params.getString("sign");
            req.packageValue = "Sign=WXPay";
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());

            callbackContext.error(ERROR_INVALID_PARAMETERS);
            return true;
        }

        final IWXAPI api = getWxAPI(cordova.getActivity());

        if (api.sendReq(req)) {
            Log.i(TAG, "Payment request has been sent successfully.");

            // send no result
            sendNoResultPluginResult(callbackContext);
        } else {
            Log.i(TAG, "Payment request has been sent unsuccessfully.");

            // send error
            callbackContext.error(ERROR_SEND_REQUEST_FAILED);
        }

        return true;
    }

    protected boolean chooseInvoiceFromWX(CordovaArgs args, CallbackContext callbackContext) {

        final IWXAPI api = getWxAPI(cordova.getActivity());

        // check if # of arguments is correct
        final JSONObject params;
        try {
            params = args.getJSONObject(0);
        } catch (JSONException e) {
            callbackContext.error(ERROR_INVALID_PARAMETERS);
            return true;
        }

        ChooseCardFromWXCardPackage.Req req = new ChooseCardFromWXCardPackage.Req();

        try {
            req.appId = getAppId();
            req.cardType = "INVOICE";
            req.signType = params.getString("signType");
            req.cardSign = params.getString("cardSign");
            req.nonceStr = params.getString("nonceStr");
            req.timeStamp = params.getString("timeStamp");
            req.canMultiSelect = "1";
        } catch (Exception e) {
            Log.e(TAG, e.getMessage());

            callbackContext.error(ERROR_INVALID_PARAMETERS);
            return true;
        }

        if (api.sendReq(req)) {
            Log.i(TAG, "Invoice request has been sent successfully.");

            // send no result
            sendNoResultPluginResult(callbackContext);
        } else {
            Log.i(TAG, "Invoice request has been sent unsuccessfully.");

            // send error
            callbackContext.error(ERROR_SEND_REQUEST_FAILED);
        }

        return true;
    }

    protected boolean isInstalled(CallbackContext callbackContext) {
        final IWXAPI api = getWxAPI(cordova.getActivity());

        if (!api.isWXAppInstalled()) {
            callbackContext.success(0);
        } else {
            callbackContext.success(1);
        }

        return true;
    }

    protected WXMediaMessage buildSharingMessage(JSONObject params)
            throws JSONException {
        Log.d(TAG, "Start building message.");

        // media parameters
        WXMediaMessage.IMediaObject mediaObject = null;
        WXMediaMessage wxMediaMessage = new WXMediaMessage();

        if (params.has(KEY_ARG_TEXT)) {
            WXTextObject textObject = new WXTextObject();
            textObject.text = params.getString(KEY_ARG_TEXT);
            mediaObject = textObject;
            wxMediaMessage.description = textObject.text;
        } else {
            JSONObject message = params.getJSONObject(KEY_ARG_MESSAGE);
            JSONObject media = message.getJSONObject(KEY_ARG_MESSAGE_MEDIA);

            wxMediaMessage.title = message.getString(KEY_ARG_MESSAGE_TITLE);
            wxMediaMessage.description = message.getString(KEY_ARG_MESSAGE_DESCRIPTION);

            // thumbnail
            Bitmap thumbnail = getThumbnail(message, KEY_ARG_MESSAGE_THUMB);
            if (thumbnail != null) {
                wxMediaMessage.setThumbImage(thumbnail);
                thumbnail.recycle();
            }

            // check types
            int type = media.has(KEY_ARG_MESSAGE_MEDIA_TYPE) ? media
                    .getInt(KEY_ARG_MESSAGE_MEDIA_TYPE) : TYPE_WECHAT_SHARING_WEBPAGE;

            switch (type) {
                case TYPE_WECHAT_SHARING_APP:
                    WXAppExtendObject appObject = new WXAppExtendObject();
                    appObject.extInfo = media.getString(KEY_ARG_MESSAGE_MEDIA_EXTINFO);
                    appObject.filePath = media.getString(KEY_ARG_MESSAGE_MEDIA_URL);
                    mediaObject = appObject;
                    break;

                case TYPE_WECHAT_SHARING_EMOTION:
                    WXEmojiObject emoObject = new WXEmojiObject();
                    InputStream emoji = getFileInputStream(media.getString(KEY_ARG_MESSAGE_MEDIA_EMOTION));
                    if (emoji != null) {
                        try {
                            emoObject.emojiData = Util.readBytes(emoji);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    mediaObject = emoObject;
                    break;

                case TYPE_WECHAT_SHARING_FILE:
                    WXFileObject fileObject = new WXFileObject();
                    fileObject.filePath = media.getString(KEY_ARG_MESSAGE_MEDIA_FILE);
                    mediaObject = fileObject;
                    break;

                case TYPE_WECHAT_SHARING_IMAGE:
                    Bitmap image = getBitmap(message.getJSONObject(KEY_ARG_MESSAGE_MEDIA), KEY_ARG_MESSAGE_MEDIA_IMAGE, 0);
                    mediaObject = new WXImageObject(image);
                    image.recycle();
                    break;

                case TYPE_WECHAT_SHARING_MUSIC:
                    WXMusicObject musicObject = new WXMusicObject();
                    musicObject.musicUrl = media.getString(KEY_ARG_MESSAGE_MEDIA_MUSICURL);
                    musicObject.musicDataUrl = media.getString(KEY_ARG_MESSAGE_MEDIA_MUSICDATAURL);
                    mediaObject = musicObject;
                    break;

                case TYPE_WECHAT_SHARING_VIDEO:
                    WXVideoObject videoObject = new WXVideoObject();
                    videoObject.videoUrl = media.getString(KEY_ARG_MESSAGE_MEDIA_VIDEOURL);
                    mediaObject = videoObject;
                    break;

                case TYPE_WECHAT_SHARING_WEBPAGE:
                default:
                    mediaObject = new WXWebpageObject(media.getString(KEY_ARG_MESSAGE_MEDIA_WEBPAGEURL));
            }
        }

        wxMediaMessage.mediaObject = mediaObject;

        return wxMediaMessage;
    }

    private String buildTransaction() {
        return String.valueOf(System.currentTimeMillis());
    }

    private String buildTransaction(final String type) {
        return type + System.currentTimeMillis();
    }

    protected Bitmap getThumbnail(JSONObject message, String key) {
        return getBitmap(message, key, MAX_THUMBNAIL_SIZE);
    }

    protected Bitmap getBitmap(JSONObject message, String key, int maxSize) {
        Bitmap bmp = null;
        String url = null;

        try {
            if (!message.has(key)) {
                return null;
            }

            url = message.getString(key);

            // get input stream
            InputStream inputStream = getFileInputStream(url);
            if (inputStream == null) {
                return null;
            }

            // decode it
            // @TODO make sure the image is not too big, or it will cause out of memory
            BitmapFactory.Options options = new BitmapFactory.Options();
            bmp = BitmapFactory.decodeStream(inputStream, null, options);

            // scale
            if (maxSize > 0 && (options.outWidth > maxSize || options.outHeight > maxSize)) {

                Log.d(TAG, String.format("Bitmap was decoded, dimension: %d x %d, max allowed size: %d.",
                        options.outWidth, options.outHeight, maxSize));

                int width = 0;
                int height = 0;

                if (options.outWidth > options.outHeight) {
                    width = maxSize;
                    height = width * options.outHeight / options.outWidth;
                } else {
                    height = maxSize;
                    width = height * options.outWidth / options.outHeight;
                }

                Bitmap scaled = Bitmap.createScaledBitmap(bmp, width, height, true);
                bmp.recycle();

                bmp = scaled;
            }

            inputStream.close();

        } catch (JSONException e) {
            bmp = null;
            e.printStackTrace();
        } catch (IOException e) {
            bmp = null;
            e.printStackTrace();
        }

        return bmp;
    }

    /**
     * Get input stream from a url
     *
     * @param url
     * @return
     */
    protected InputStream getFileInputStream(String url) {
        try {

            InputStream inputStream = null;

            if (URLUtil.isHttpUrl(url) || URLUtil.isHttpsUrl(url)) {

                File file = Util.downloadAndCacheFile(webView.getContext(), url);

                if (file == null) {
                    Log.d(TAG, String.format("File could not be downloaded from %s.", url));
                    return null;
                }

                url = file.getAbsolutePath();
                inputStream = new FileInputStream(file);

                Log.d(TAG, String.format("File was downloaded and cached to %s.", url));

            } else if (url.startsWith("data:image")) {  // base64 image

                String imageDataBytes = url.substring(url.indexOf(",") + 1);
                byte imageBytes[] = Base64.decode(imageDataBytes.getBytes(), Base64.DEFAULT);
                inputStream = new ByteArrayInputStream(imageBytes);

                Log.d(TAG, "Image is in base64 format.");

            } else if (url.startsWith(EXTERNAL_STORAGE_IMAGE_PREFIX)) { // external path

                url = Environment.getExternalStorageDirectory().getAbsolutePath() + url.substring(EXTERNAL_STORAGE_IMAGE_PREFIX.length());
                inputStream = new FileInputStream(url);

                Log.d(TAG, String.format("File is located on external storage at %s.", url));

            } else if (!url.startsWith("/")) { // relative path

                inputStream = cordova.getActivity().getApplicationContext().getAssets().open(url);

                Log.d(TAG, String.format("File is located in assets folder at %s.", url));

            } else {

                inputStream = new FileInputStream(url);

                Log.d(TAG, String.format("File is located at %s.", url));

            }

            return inputStream;

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    public static String getAppId() {
        if (appId == null) {
            appId = preferences.getString(WXAPPID_PROPERTY_KEY, "");
        }

        return appId;
    }

    /**
     * Get saved app id
     *
     * @param ctx
     * @return
     */
    public static String getSavedAppId(Context ctx) {
        SharedPreferences settings = ctx.getSharedPreferences(PREFS_NAME, 0);
        return settings.getString(WXAPPID_PROPERTY_KEY, "");
    }

    /**
     * Save app id into SharedPreferences
     *
     * @param ctx
     * @param id
     */
    public static void saveAppId(Context ctx, String id) {
        if (id.isEmpty()) {
            return;
        }

        SharedPreferences settings = ctx.getSharedPreferences(PREFS_NAME, 0);
        SharedPreferences.Editor editor = settings.edit();
        editor.putString(WXAPPID_PROPERTY_KEY, id);
        editor.commit();
    }

    public static CallbackContext getCurrentCallbackContext() {
        return currentCallbackContext;
    }

    private void sendNoResultPluginResult(CallbackContext callbackContext) {
        // save current callback context
        currentCallbackContext = callbackContext;

        // send no result and keep callback
        PluginResult result = new PluginResult(PluginResult.Status.NO_RESULT);
        result.setKeepCallback(true);
        callbackContext.sendPluginResult(result);
//        callbackContext.success();
    }
}
