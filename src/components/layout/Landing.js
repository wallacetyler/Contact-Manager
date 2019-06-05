import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
			<header>
				<h2>
				  Contact Manager
				</h2>
			</header>

            <div className="col s6">
			<Link to="/register"
				style={{
					color: "#e1e1e1",
					fontSize: "15px",
					cursor: "pointer",
					fontFamily: "Century Gothic, CenturyGothic, Geneva, AppleGothic, sans-serif",
				}}>
				<button>
					<span>Register</span>
				</button>
			</Link>
            </div>

            <div className="col s6">
              <Link to="/login"
					style={{
						color: "#e1e1e1",
						fontSize: "15px",
						cursor: "pointer",
						fontFamily: "Century Gothic, CenturyGothic, Geneva, AppleGothic, sans-serif",
					}}>
					<button>
						<span>Login</span>
					</button>
				</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;