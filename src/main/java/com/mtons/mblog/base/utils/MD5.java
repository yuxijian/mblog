/*
+--------------------------------------------------------------------------
|   mtons [#RELEASE_VERSION#]
|   ========================================
|   Copyright (c) 2014, 2015 mtons. All Rights Reserved
|   http://www.mtons.com
|
+---------------------------------------------------------------------------
*/
package com.mtons.mblog.base.utils;

import org.apache.commons.lang3.StringUtils;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * MD5摘要
 */
public class MD5 {

	/**
	 * 对字符串进行Md5加密
	 *
	 * @param input 原文
	 * @return md5后的密文
	 */
	public static String md5(String input) {
		byte[] code = null;
		try {
			code = MessageDigest.getInstance("md5").digest(input.getBytes());
		} catch (NoSuchAlgorithmException e) {
			code = input.getBytes();
		}
		BigInteger bi = new BigInteger(code);
		return bi.abs().toString(32).toUpperCase();
	}

	/**
	 * 对字符串进行Md5加密
	 *
	 * @param input 原文
	 * @param salt 随机数
	 * @return string
	 */
	public static String md5(String input, String salt) {
		if(StringUtils.isEmpty(salt)) {
			salt = "";
		}
		return md5(salt + md5(input));
	}

	/**
	 * 文件md5计算
	 *
	 * @param bytes
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	public static String md5File(byte[] bytes)  {
		byte[] code = new byte[0];
		try {
			code = MessageDigest.getInstance("md5").digest(bytes);
		} catch (NoSuchAlgorithmException e) {
			return "";
		}
		BigInteger bi = new BigInteger(code);
		return bi.abs().toString(32).toUpperCase();
	}


	public static String hex(byte[] array) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < array.length; ++i) {
			sb.append(Integer.toHexString((array[i] & 0xFF) | 0x100).substring(1,3));
		}
		return sb.toString();
	}

	/**
	 * https://en.gravatar.com/
	 * hash登录gravatar.com的邮件地址，获取对应邮件的头像
	 * @param message
	 * @return
	 */
	public static String md5Hex (String message) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			return hex (md.digest(message.getBytes("CP1252")));
		} catch (NoSuchAlgorithmException e) {
		} catch (UnsupportedEncodingException e) {
		}
		return null;
	}

}
