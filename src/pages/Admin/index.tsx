import styles from "../Catalog/Catalog.module.scss";
import Buscador from "../Catalog/Buscador";
import Filtros from "../Catalog/Filtros";
import Ordenador from "../Catalog/Ordenador";
import Itens from "../Catalog/Itens";
import AdminList from "./AdminList";

export function Admin({token, removeToken}: any) {
    return(
        <main>
            <div className="row align-items-center" style={{backgroundColor: "#0a448a", color: "white"}}>
                <div className="col d-flex justify-content-end">
                    <img className="img-fluid" src="https://images.kavak.services/br/assets/images/catalogue/webp/top-banner-promo-md.webp" alt="banner-promo"/>
                </div>
                <div className="col">
                    <h6 className="text-left">Bem Vindo ao Admin!</h6>
                </div>
            </div>
            <section className="row">
                <div className="p-5">
                    <AdminList token={token} removeToken={removeToken} />
                </div>
            </section>
        </main>
    )
}
