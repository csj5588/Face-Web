import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva({
  onError: (err) => {
    console.log(err);
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./pages/login/LoginModel'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
