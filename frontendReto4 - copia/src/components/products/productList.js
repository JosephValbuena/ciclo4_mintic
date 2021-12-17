import React, { Component } from 'react'
import axios from 'axios';

class ProductList extends Component {

    componentDidMount() {
        //axios.get('').then().catch();
    }

    render() {
        return (
            <main className="d-flex justify-content-center align-items-center">
                <div className="caja p-4 listaProd">
                    <div id="table-prod"></div>
                </div>
                <div className="caja" id="edit-form">

                </div>
            </main>
        );
    }

}

export default ProductList;