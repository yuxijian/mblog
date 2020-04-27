function convertTime(v) {
    if (v != null) {
        var date = new Date(v.time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        var h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        var M = date.getMinutes();
        M = M < 10 ? ("0" + M) : M;
        var S = date.getSeconds();
        S = S < 10 ? ("0" + S) : S;
        var str = y + "-" + m + "-" + d + " " + h + ":" + M + ":" + S;
        return str;
    }
    return "—";
}

function convertTimeYMD(v) {
    if (v != null) {
        var date = new Date(v.time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ("0" + d) : d;
        var h = date.getHours();
        h = h < 10 ? ("0" + h) : h;
        var M = date.getMinutes();
        M = M < 10 ? ("0" + M) : M;
        var S = date.getSeconds();
        S = S < 10 ? ("0" + S) : S;
        var str = y + "-" + m + "-" + d;
        return str;
    }
    return "——";
}

function convertActionType(v) {
    var str = "未知类型";
    if (v == 1) {
        str = "模块";
    } else if (v == 2) {
        str = "菜单url";
    } else if (v == 3) {
        str = "方法";
    } else if (v == 4) {
        str = "按钮";
    }
    return str;

}

/**
 * 查询
 */
layui.use(['form', 'layedit', 'layer', 'laydate'], function () {
    form = layui.form;
    selectCorporation();
    selectStore(0);
    form.on('select(corporationId)', function (data) {
        selectStore(data.value);
    })
});

function selectCorporation(isdefault) {
    $.ajax({
        url: "/common/getcorporation",
        type: "GET",
        dataType: "json",
        success: function (result) {
            $("#corporationId").html("");
            //var optiondefault = $("<option>").val(0).text("请选择");
            var count = 0;
            $.each(result, function (key, val) {
                for (var i = 0; i < val.length; i++) {
                    count++;
                    var option1 = $("<option>").val(val[i].corporationID).text(val[i].corporationname);
                    $("#corporationId").append(option1);
                    //form.render('select');
                }
            });
            if (count > 1) {
                //$("#corporationId").prepend(optiondefault);
            }
            else {
                $("#corporationId").attr("disabled", "disabled");
            }
            $("#corporationId option:first").prop("selected", 'selected');
            form.render("select");                                // 刷性select，显示出数据
        }
    });
}


function selectStore(corporationId) {
    $.ajax({
        url: "/common/getstore?corporationId=" + corporationId,
        type: "GET",
        dataType: "json",
        success: function (result) {
            $("#storeId").html("");
            var count = 0;
            var optiondefault = $("<option>").val(0).text("请选择");
            $.each(result, function (key, val) {
                for (var i = 0; i < val.length; i++) {
                    count++;
                    var option1 = $("<option>").val(val[i].departmentid).text(val[i].departmentname);
                    $("#storeId").append(option1);
                    form.render('select');
                }
            });
            if (count > 1) {
                $("#storeId").prepend(optiondefault);
            }
            $("#storeId option:first").prop("selected", 'selected');
            form.render("select");                                // 刷性select，显示出数据
        }
    });
}

/**
 * 新增
 */
layui.use(['form', 'layedit', 'layer', 'laydate'], function () {
    form = layui.form;
    addselectCorporation();
    addselectStore(0);
    form.on('select(addcorporationId)', function (data) {

        addselectStore(data.value);
    })
});

function addselectCorporation() {
    $.ajax({
        url: "/common/getcorporation",
        type: "GET",
        dataType: "json",
        success: function (result) {
            $("#addcorporationId").html("");
            var optiondefault = $("<option>").val(0).text("请选择");
            var count = 0;
            $.each(result, function (key, val) {
                for (var i = 0; i < val.length; i++) {
                    count++;
                    var option1 = $("<option>").val(val[i].corporationID).text(val[i].corporationname);
                    $("#addcorporationId").append(option1);
                    //form.render('select');
                }
            });
            if (count > 1) {
                $("#addcorporationId").prepend(optiondefault);
            }
            else {
                $("#addcorporationId").attr("disabled", "disabled");
            }
            // $("#addcorporationId").get(0).selectedIndex = 0;
            var corporationId = $("#hd_corporationId").val();
            $("#addcorporationId").find("option[value = '" + corporationId + "']").attr("selected", "selected");
            //$("#addcorporationId option:first").prop("selected", 'selected');
            form.render("select");                                // 刷性select，显示出数据
        }
    });
}

function addselectStore(corporationId) {
    $.ajax({
        url: "/common/getstore?corporationId=" + corporationId,
        type: "GET",
        dataType: "json",
        success: function (result) {

            $("#addstoreId").html("");
            var count = 0;
            var optiondefault = $("<option>").val(0).text("请选择");
            $.each(result, function (key, val) {
                for (var i = 0; i < val.length; i++) {
                    count++;
                    var option1 = $("<option>").val(val[i].departmentid).text(val[i].departmentname);
                    $("#addstoreId").append(option1);
                }
            });
            if (count > 1) {
                $("#addstoreId").prepend(optiondefault);
            }
            // $("#addstoreId").get(0).selectedIndex = 0;

            var storeId = $("#hd_storeId").val();
            $("#addstoreId").find("option[value = '" + storeId + "']").attr("selected", "selected");
            form.render("select");                                // 刷性select，显示出数据
        }
    });
}

$(document).ready(function () {

    layui.use(['form', 'layedit', 'layer', 'laydate'], function () {
        form = layui.form;
        var editcorporationId = $("#hd_corporationId").val();
        var editstoreId = $("#hd_storeId").val();
        $("#addcorporationId").val(editcorporationId);
        $("#addstoreId").val(editstoreId);
        form.render("select");
    });
});


