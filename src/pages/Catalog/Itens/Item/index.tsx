import styles from './Item.module.scss'
import cars_default from '../itens.json'
import classNames from "classnames";

type Props = typeof cars_default[0];

export default function Item(props: Props){
    const { title, year, km, city, price, photo } = props;
    return (
        <div className="col mb-4">
            <div className="card">
                <img className="card-img-top" src={photo} alt="Card image cap" />
                <div className="card-body">
                    <div className="row">
                        <div className="col-7"><h5 className="card-title">{title}</h5></div>
                        <div className="col-5"><img
                            className="card-title"
                            src="https://images.kavak.services/br/assets/images/vip/badgets/svg/promotion-status.svg"
                            alt=""
                            style={{height: "24px", width: "102px"}}
                        /></div>
                    </div>
                    {/*<h5 className="card-title">Card title</h5>*/}
                    <p><small> {year} * {km} Km * {city}</small></p>
                    <div className="row">
                        <div className="col-7">
                            <h5 style={{color: "#3374db"}}>R$ {price.toFixed(2)}</h5>
                        </div>
                        <div className="col-5">
                            <small>
                                <s>R${price.toFixed(2)}</s>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </div>
    );
}
