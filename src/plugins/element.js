import Vue from "vue";
import { Button, Pagination, InputNumber, Message } from "element-ui";

Vue.use(Button);
Vue.use(Pagination);
Vue.use(InputNumber);
Vue.use(Message);

Vue.prototype.$message = Message;
