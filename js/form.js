$(function () {
            // blur事件
            $("form :input.required").blur(function (e) {
                var $parent = $(this).parent();
                var $val = $(this).val();
                $parent.find(".formtips").remove();
                // 判断检测的类型，username？password
                if ($(this).is("#username")) {
                    if ($val == "" || $val.length < 6) {
                        var errorMsg = "输入至少6位用户名";
                        $parent.append("<div class='formtips wrong'>" + errorMsg + "</div>");
                        $(this).removeClass("success").addClass("error")
                    } else {
                        $(this).removeClass("error").addClass("success");
                    }
                }
                if ($(this).is("#password")) {
                    if ($val == "" || $val.length < 6) {
                        var errorMsg = "输入至少6位密码";
                        $parent.append("<div class='formtips wrong'>" + errorMsg + "</div>");
                        $(this).removeClass("success").addClass("error");
                    } else {
                        $(this).removeClass("error").addClass("success");
                    }
                }
            }).keyup(function (e) {
                // trigger，触发blur事件，这里使用triggerHandler，会触发你定义的blur事件// 区别于trigger
                $(this).triggerHandler("blur");
            })
            // 为了阻止用户恶意提交，在提交的时候，触发blur事件，做一个检测
            $("#submit_btn").click(function (e) {
                $("form :input.required").trigger("blur");
                var $formtipsNum = $(".formtips").length;
                if ($formtipsNum > 0) {
                    return false;
                } else {
                    alert("表单已经提交！")
                }
            })

        })