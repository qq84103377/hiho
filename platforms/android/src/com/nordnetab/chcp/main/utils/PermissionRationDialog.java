package com.nordnetab.chcp.main.utils;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.support.annotation.NonNull;
import android.support.annotation.StyleRes;


/**
 * Created by chenfuxu on 2017/3/16.
 */

public class PermissionRationDialog extends AlertDialog.Builder {


    public PermissionRationDialog(@NonNull Context context) {
        super(context);
        this.setTitle("提示")
                .setMessage("权限被拒，无法进行操作，请在设置中手动授予权限")
                .setCancelable(true)
                .setNegativeButton("取消", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .setPositiveButton("确定", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Uri packageURI = Uri.parse("package:" + context.getPackageName());
                        Intent intent = new Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS,packageURI);
                        context.startActivity(intent);
                    }
                });
    }

    public PermissionRationDialog(@NonNull Context context, @StyleRes int themeResId) {
        super(context, themeResId);
    }
}
