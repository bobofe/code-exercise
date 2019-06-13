function animate(obj,json,fn) {  // ��˭    json
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;  // �����ж��Ƿ�ֹͣ��ʱ��   һ��д������������
        for(var attr in json){   // attr  ����     json[attr]  ֵ
            //��ʼ���� json
            // ���㲽��    �� target λ�� ��ȥ��ǰ��λ��  ���� 10
            // console.log(attr);
            var current = 0;
            if(attr == "opacity")
            {
                current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
                console.log(current);
            }
            else
            {
                current = parseInt(getStyle(obj,attr)); // ��ֵ
            }
            // console.log(current);
            // Ŀ��λ�þ���  ����ֵ
            var step = ( json[attr] - current) / 10;  // ����  ��Ŀ��λ�� - ���ڵ�λ�� / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //�ж�͸����
            if(attr == "opacity")  // �ж��û���û������ opacity
            {
                if("opacity" in obj.style)  // �ж� ����������Ƿ�֧��opacity
                {
                    // obj.style.opacity
                    obj.style.opacity = (current + step) /100;
                }
                else
                {  // obj.style.filter = alpha(opacity = 30)
                    obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                }
            }
            else if(attr == "zIndex")
            {
                obj.style.zIndex = json[attr];
            }
            else
            {
                obj.style[attr] = current  + step + "px" ;
            }

            if(current != json[attr])  // ֻҪ����һ������������ �Ͳ�Ӧ��ֹͣ��ʱ��  ���һ����������
            {
                flag =  false;
            }
        }
        if(flag)  // �����ж϶�ʱ��������
        {
            clearInterval(obj.timer);
            //alert("ok��");
            if(fn)   // �ܼ�   ����ʱ��ֹͣ�ˡ� �����ͽ�����  ����лص�����Ӧ��ִ�лص�
            {
                fn(); // ������ +  ����  ���ú���  ִ�к���
            }
        }
    },10)
}
function getStyle(obj,attr) {  //  ˭��      �Ǹ�����
    if(obj.currentStyle)  // ie ��
    {
        return obj.currentStyle[attr];  // ���ش��ݹ�����ĳ������
    }
    else
    {
        return window.getComputedStyle(obj,null)[attr];  // w3c �����
    }
}