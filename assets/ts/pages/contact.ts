/**
 * Copyright by XmT Ltd.
 */

"use strict";

class ContactForm {
    private url:string;

    constructor() {
        this.url = "/webapi"
    }

    public initContactForm() {
        let self = this;
        // Validation
        $("#sky-form3").validate({
            errorElement:"em",
            // Rules for form validation
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                }
            },

            // Messages for form validation
            messages: {
                name: {
                    required: '请输入您的姓名'
                },
                email: {
                    required: '请输入您的e-mail地址',
                    email: '请输入<b>有效的</b>e-mail地址'
                },
                message: {
                    required: '请输入您要发送的信息内容',
                }
            },

            // Ajax form submition
            submitHandler: function () {
                $.ajax({
                        type: "POST",
                        url: self.url + "/support/contact",
                        timeout: 5000,
                        contentType: "application/json",
                        data: JSON.stringify({
                            name: $("#name").val(),
                            email: $("#email").val(),
                            message: $("#message").val()
                        }),
                        success: function (data) {
                            console.log(data);
                            if (data === "success") {
                                $('#sky-form3 button[type="submit"]').attr('disabled', true);
                                $("#sky-form3").addClass('submited');
                            } else {
                                App.alert("您的信息发送失败，请稍后重试");
                            }
                        },
                        error: function () {
                            App.alert("您的信息发送失败，请稍后重试");
                        }
                    });
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
    }
}