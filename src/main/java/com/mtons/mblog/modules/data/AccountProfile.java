/*
+--------------------------------------------------------------------------
|   Mblog [#RELEASE_VERSION#]
|   ========================================
|   Copyright (c) 2014, 2015 mtons. All Rights Reserved
|   http://www.mtons.com
|
+---------------------------------------------------------------------------
*/
package com.mtons.mblog.modules.data;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * @author yuxijian
 *
 */
@Data
public class AccountProfile implements Serializable {
    private static final long serialVersionUID = 1748764917028425871L;
    private long id;
    private String username;
    private String avatar;
    private String name;
    private String email;

    private Date lastLogin;
    private int status;

    private BadgesCount badgesCount;

    private long roleId;

    public AccountProfile(long id, String username) {
        this.id = id;
        this.username = username;
    }
}
