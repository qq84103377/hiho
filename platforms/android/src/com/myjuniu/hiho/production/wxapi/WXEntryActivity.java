package com.myjuniu.hiho.production.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.tencent.mm.opensdk.constants.ConstantsAPI;
import com.tencent.mm.opensdk.modelbase.BaseReq;
import com.tencent.mm.opensdk.modelbase.BaseResp;
import com.tencent.mm.opensdk.modelbiz.ChooseCardFromWXCardPackage;
import com.tencent.mm.opensdk.modelmsg.SendAuth;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import xu.li.cordova.wechat.Wechat;

/**
 * @author juniu
 * @date 18/6/21
 * @description 微信回调类（类名必须是 包名.wxapi.WXEntryActivity）
 */

public class WXEntryActivity extends Activity implements IWXAPIEventHandler {
    private static final String APP_SECRET = "填写自己的AppSecret";
    private IWXAPI mWeixinAPI;
    public static String WEIXIN_APP_ID = "wxbd3a38a935931067";
    private static String uuid;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        try {
            ApplicationInfo appInfo = this.getPackageManager()
                    .getApplicationInfo(getPackageName(),
                            PackageManager.GET_META_DATA);
            String appid = appInfo.metaData.getString("WX_APPID");
            if (!TextUtils.isEmpty(appid)) {
                WEIXIN_APP_ID = appid;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


        mWeixinAPI = WXAPIFactory.createWXAPI(this, WEIXIN_APP_ID, true);
        mWeixinAPI.handleIntent(this.getIntent(), this);
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        mWeixinAPI.handleIntent(intent, this);//必须调用此句话
    }

    private void showToast(String msg) {
//        Toast.makeText(this, msg + "", Toast.LENGTH_LONG).show();
    }

    //微信发送的请求将回调到onReq方法
    @Override
    public void onReq(BaseReq req) {
        showToast("onReq");

    }


    //发送到微信请求的响应结果
    @Override
    public void onResp(BaseResp resp) {

        try {
            CallbackContext ctx = Wechat.getCurrentCallbackContext();

            if (ctx == null) {
//                startMainActivity();
                finish();
                return;
            }

            switch (resp.errCode) {
                case BaseResp.ErrCode.ERR_OK:
                    //发送成功
                    switch (resp.getType()) {
                        case ConstantsAPI.COMMAND_SENDAUTH:
                            showToast("ERR_OK");
                            auth(resp);
                            break;
                        case ConstantsAPI.COMMAND_CHOOSE_CARD_FROM_EX_CARD_PACKAGE:
                            plunckInvoiceData(resp);
                            break;
                        case ConstantsAPI.COMMAND_PAY_BY_WX:
                        default:
                            ctx.success();
                            break;
                    }
//                    auth(resp);
                    break;
                case BaseResp.ErrCode.ERR_USER_CANCEL:
                    showToast("ERR_USER_CANCEL");
                    //发送取消
                    ctx.error(Wechat.ERROR_WECHAT_RESPONSE_USER_CANCEL);
                    break;
                case BaseResp.ErrCode.ERR_AUTH_DENIED:
                    showToast("ERR_AUTH_DENIED");
                    //发送被拒绝
                    ctx.error(Wechat.ERROR_WECHAT_RESPONSE_AUTH_DENIED);
                    break;
                case BaseResp.ErrCode.ERR_SENT_FAILED:
                    ctx.error(Wechat.ERROR_WECHAT_RESPONSE_SENT_FAILED);
                    break;
                case BaseResp.ErrCode.ERR_UNSUPPORT:
                    ctx.error(Wechat.ERROR_WECHAT_RESPONSE_UNSUPPORT);
                    break;
                case BaseResp.ErrCode.ERR_COMM:
                    ctx.error(Wechat.ERROR_WECHAT_RESPONSE_COMMON);
                    break;
                default:
                    //发送返回
                    ctx.error(Wechat.ERROR_WECHAT_RESPONSE_UNKNOWN);
                    break;
            }

            // restore appid
            final String appid = Wechat.getAppId();
            final String savedAppId = Wechat.getSavedAppId(this);
            if (!savedAppId.equals(appid)) {
                Wechat.saveAppId(this, Wechat.getAppId());
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            finish();
        }

    }

    protected void startMainActivity() {
        Intent intent = new Intent();
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        intent.setPackage(getApplicationContext().getPackageName());
        getApplicationContext().startActivity(intent);
    }

    protected void auth(BaseResp resp) {
        // get current callback context
        CallbackContext ctx = Wechat.getCurrentCallbackContext();
        try {
            SendAuth.Resp res = ((SendAuth.Resp) resp);

            Log.d(Wechat.TAG, res.toString());

            String str = "type = " + res.getType() + "\n"
                    + "code = " + res.code;

            if (ctx == null) {
                return;
            }


            JSONObject response = new JSONObject();
            try {
                response.put("code", res.code);
                response.put("state", res.state);
                response.put("country", res.country);
                response.put("lang", res.lang);
            } catch (JSONException e) {
                Log.e(Wechat.TAG, e.getMessage());
            }

            ctx.success(response);
            showToast("onResp success = " + str);
        } catch (Exception e) {
            e.printStackTrace();
            ctx.error(e.toString());
        }
    }

    protected void plunckInvoiceData(BaseResp resp) {

        CallbackContext ctx = Wechat.getCurrentCallbackContext();
        ChooseCardFromWXCardPackage.Resp resp1 = (ChooseCardFromWXCardPackage.Resp) resp;
        JSONObject response = new JSONObject();

        try {
            JSONArray resp2 = new JSONArray(resp1.cardItemList);
            response.put("data", resp2);
        } catch (JSONException e) {
            Log.e(Wechat.TAG, e.getMessage());
        }

        ctx.success(response);
    }

}
