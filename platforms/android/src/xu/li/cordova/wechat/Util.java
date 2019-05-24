package xu.li.cordova.wechat;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.text.TextUtils;
import android.util.Base64;
import android.util.Log;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class Util {

    /**
     * Read bytes from InputStream
     *
     * @param inputStream
     * @return
     * @throws IOException
     * @link http://stackoverflow.com/questions/2436385/android-getting-from-a-uri-to-an-inputstream-to-a-byte-array
     */
    public static byte[] readBytes(InputStream inputStream) throws IOException {
        // this dynamically extends to take the bytes you read
        ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream();

        // this is storage overwritten on each iteration with bytes
        int bufferSize = 1024;
        byte[] buffer = new byte[bufferSize];

        // we need to know how may bytes were read to write them to the byteBuffer
        int len = 0;
        while ((len = inputStream.read(buffer)) != -1) {
            byteBuffer.write(buffer, 0, len);
        }

        // and then we can return your byte array.
        return byteBuffer.toByteArray();
    }

    public static File getCacheFolder(Context context) {
        File cacheDir = null;
        if (Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED)) {
            cacheDir = new File(Environment.getExternalStorageDirectory(), "cache");
            if (!cacheDir.isDirectory()) {
                cacheDir.mkdirs();
            }
        }

        if (!cacheDir.isDirectory()) {
            cacheDir = context.getCacheDir(); //get system cache folder
        }

        return cacheDir;
    }

    public static File downloadAndCacheFile(Context context, String url) {
        URL fileURL = null;
        try {
            fileURL = new URL(url);

            Log.d(Wechat.TAG, String.format("Start downloading file at %s.", url));

            HttpURLConnection connection = (HttpURLConnection) fileURL.openConnection();
            connection.connect();

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                Log.e(Wechat.TAG, String.format("Failed to download file from %s, response code: %d.", url, connection.getResponseCode()));
                return null;
            }

            InputStream inputStream = connection.getInputStream();

            File cacheDir = getCacheFolder(context);
            File cacheFile = new File(cacheDir, url.substring(url.lastIndexOf("/") + 1));
            FileOutputStream outputStream = new FileOutputStream(cacheFile);

            byte buffer[] = new byte[4096];
            int dataSize;
            while ((dataSize = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, dataSize);
            }
            outputStream.close();

            Log.d(Wechat.TAG, String.format("File was downloaded and saved at %s.", cacheFile.getAbsolutePath()));

            return cacheFile;
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * 下载多张图片
     *
     * @param context
     * @param isCache                 true 下载到"SDCard/Android/data/你的应用包名/cache/目录"下  false 下载到"SDCard/Android/data/你的应用的包名/files/目录"下
     * @param netList
     * @param onDownloadImageListener
     */
    public static void downloadAndCacheFile(Context context, boolean isCache, List<String> netList, OnDownloadImageListener onDownloadImageListener) {
        List<String> localList = new ArrayList<>();
        int count = 0;
        for (String url : netList) {
            URL fileURL = null;
            try {
                fileURL = new URL(url);

                Log.d(Wechat.TAG, String.format("Start downloading file at %s.", url));

                HttpURLConnection connection = (HttpURLConnection) fileURL.openConnection();
                connection.connect();

                if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                    Log.e(Wechat.TAG, String.format("Failed to download file from %s, response code: %d.", url, connection.getResponseCode()));
                    continue;
                }

                InputStream inputStream = connection.getInputStream();

                /**
                 * 根据isCache判断是否下载到缓存中
                 */
                String filePath = (isCache ? context.getExternalCacheDir().getPath() : context.getExternalFilesDir(Environment.DIRECTORY_PICTURES).getPath()) + "/" + System.currentTimeMillis() + ".jpg";
                Log.e("lyd", " filePath " + filePath);
                File cacheFile = new File(filePath);
                FileOutputStream outputStream = new FileOutputStream(cacheFile);

                byte buffer[] = new byte[4096];
                int dataSize;
                while ((dataSize = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, dataSize);
                }
                outputStream.close();

                Log.e(Wechat.TAG, String.format("File was downloaded and saved at %s.", cacheFile.getAbsolutePath()));
                localList.add(cacheFile.getAbsolutePath());
            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                count += 1;
                if (count == netList.size()) {
                    onDownloadImageListener.onComplete(localList);
                }
            }
        }
    }

    /**
     * 保存base64图片
     *
     * @param context
     * @param base64Code
     * @param isCache
     * @return
     */
    public static String saveBase64File(Context context, String base64Code,
                                        boolean isCache) {
        //byte[] buffer = new BASE64Decoder().decodeBuffer(base64Code);
        String savePath = "";
        if (TextUtils.isEmpty(base64Code)) {
            return savePath;
        }

        FileOutputStream fileOutputStream = null;
        try {
            String dir1 = context.getExternalCacheDir().getPath();
            String dir2 = context.getExternalFilesDir(Environment.DIRECTORY_PICTURES).getPath();

            savePath = (isCache ? dir1 : dir2) + File.separator
                    + System.currentTimeMillis() + ".jpg";
            byte[] buffer = Base64.decode(base64Code.split(",")[1], Base64.DEFAULT);
            FileOutputStream out = new FileOutputStream(savePath);
            out.write(buffer);

            fileOutputStream = out;
            Log.e("Hzhddd", "保存成功!");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (fileOutputStream != null) {
                try {
                    fileOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return savePath;
    }

    /**
     * 复制到粘贴版
     *
     * @param context
     * @param msg
     */
    public static void copyTextToClipboard(Context context, String msg) {
        //获取剪贴板管理器：
        ClipboardManager cm = (ClipboardManager) context.getSystemService(Context.CLIPBOARD_SERVICE);
        // 创建普通字符型ClipData
        ClipData mClipData = ClipData.newPlainText("", msg);
        // 将ClipData内容放到系统剪贴板里。
        cm.setPrimaryClip(mClipData);
    }

    /**
     * 保存图片到相册中
     *
     * @param context
     */
    public static void saveImageToGallery(Context context, List<String> imageList) throws FileNotFoundException {
        for (String filePath : imageList) {
            // 把文件插入到系统图库
            File file = new File(filePath);
            Log.e("lyd", " saveImageToGallery " + file.getName());
            MediaStore.Images.Media.insertImage(context.getContentResolver(),
                    file.getAbsolutePath(), file.getName(), null);
            //通知图库更新
            context.sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.parse(filePath)));
        }
    }
}
