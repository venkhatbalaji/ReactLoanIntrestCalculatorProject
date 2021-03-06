import React, {Component} from 'react';
import axios from 'axios';

class Calculator extends Component {
    constructor(props){
        super(props);
        this.state={
			loading:false,
            interestRate: 0,
            monthlyPayment:0,
            numPayments: 0
        }
	}

    componentDidMount() {
		axios
			.get(
				`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.props.data.amount}&numMonths=${this.props.data.month}`
			)
			.then(res => {
                console.log(res.data)
				this.setState({
					loading:true,
					interestRate: res.data.interestRate,
					monthlyPayment: res.data.monthlyPayment.amount,
					numPayments: res.data.numPayments
				});
			})
			.catch(e => console.log(e));
	}
	
    componentDidUpdate(prevState) {
		if (
			prevState.data.amount !== this.props.data.amount ||
		    prevState.data.month !== this.props.data.month
		) {	
		this.setState({loading:false});
			axios
				.get(
					`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.props.data.amount}&numMonths=${this.props.data.month}`
				)
				.then(res => {
					console.log(res.data);
					if (res.data.status && res.data.status === "error") {
						console.log("Error occurred");
					} else {
						this.setState({
							loading:true,
							interestRate: res.data.interestRate,
							monthlyPayment: res.data.monthlyPayment.amount,
							numPayments: res.data.numPayments
						});
					}
				})
				.catch(e => console.log(e));
		}
	}
    render(){
        return(
            <div className="calculator-box">
				{!this.state.loading  ? 
				(
					<div className="calculator-header">
						<div className="loader"></div>
					</div>
				) :
				(<div>
					<h1 className="calculator-header">Interest Details:</h1>
					<h2>Interest Rate:{this.state.interestRate}</h2>
					<h2>Monthly Payment:{this.state.monthlyPayment}</h2>
					<h2>Number of Payments:{this.state.numPayments}</h2>      				
				</div>)
				}					
            </div>
        );
    }

}

export default Calculator;