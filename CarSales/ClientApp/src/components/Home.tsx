import * as React from 'react';
import { connect } from 'react-redux';

const Home = () => (
    <div>
        <h1>Hello! Welcome to CarSales MVP by Avtar Singh.</h1>
        <p>Welcome to your new single-page application, built with:</p>
        <ul>
            <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
            <li><a href='https://facebook.github.io/react/'>React</a> and <a href='https://redux.js.org/'>Redux</a> for client-side code</li>
            <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
        </ul>
        <p>To help you get started, we've also set up:</p>
        <ul>
            <li><strong>Client-side navigation</strong>. For example, click <em>Cars</em> then <em>Back</em> to return here.</li>
            <li>Please change the "appDbConnection" string in "appsettings.json" to your local database.</li>
        </ul>
        <p>The <code>ClientApp</code> subdirectory is a standard React application. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
    </div>
);

export default connect()(Home);