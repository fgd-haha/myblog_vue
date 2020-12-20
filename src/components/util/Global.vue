<!--全局变量，配置文件-->

<script>
const domain = 'https://www.fanguodong.com/';
// const domain='http://127.0.0.1:8000/';

const errorUserPhoto = 'this.src="' + 'https://www.fanguodong.com/static/user_img/default.jpg' + '"'

function isphone() {
    let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let client_height = document.documentElement.clientHeight || document.body.clientHeight;
    console.log(client_height, clientWidth);
    return clientWidth < 1079;
}

export default {
    domain,
    errorUserPhoto,
    isphone,
}
</script>
