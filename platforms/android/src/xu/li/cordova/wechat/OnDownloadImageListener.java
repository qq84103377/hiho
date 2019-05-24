package xu.li.cordova.wechat;

/**
 * @author lyd
 * @date 18/6/14
 * @desription
 */

import java.util.List;

/**
 * @author lyd
 * @date 18/6/12
 * @desription 图片下载完成监听（只会判断是否完成下载命令，不会判决是否下载成功）
 */

public interface OnDownloadImageListener {
    /**
     * 完成监听
     * @param imageList
     */
    void onComplete(List<String> imageList);
}
