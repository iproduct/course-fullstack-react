/**
 * This file provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial testing and evaluation purposes only. 
 * IPT reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

import React from 'react';
import Navigation from './main/navigation';
// import Home from './parts/home';

class MainLayout extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (<div>
     
      <Navigation />

      <div className="container">
        {/* Here routed components go ... */}
        {this.props.children}
      </div>
    </div>);
  }
}

MainLayout.propTypes = {
  children: React.PropTypes.node
}

export default MainLayout;