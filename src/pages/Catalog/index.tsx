import styles from "./Catalog.module.scss";
import { useState } from "react";
import Filtros from "./Filtros";
import Ordenador from "./Ordenador";
import Itens from "./Itens";
import Buscador from "./Buscador";

export default function Catalog() {
    const [busca, setBusca] = useState("");
    const [filtro, setFiltro] = useState<number | null>(null);
    const [ordenador, setOrdenador] = useState("");

    return (
        <main>
            <nav className={styles.menu}>
                {/*<Logo />*/}
                <Buscador busca={busca} setBusca={setBusca} />
            </nav>
            <div className="row align-items-center" style={{backgroundColor: "#0a448a", color: "white"}}>
                <div className="col d-flex justify-content-end">
                    <img className="img-fluid" src="https://images.kavak.services/br/assets/images/catalogue/webp/top-banner-promo-md.webp" alt="banner-promo"/>
                </div>
                <div className="col">
                    <h6 className="text-left">Aproveite as promoções!</h6>
                </div>
            </div>
            <section className={styles.catalog}>
                <h3 className={styles.catalog__titulo}>CARROS USADOS</h3>
                <div className={styles.catalog__filtros}>
                    <Filtros filtro={filtro} setFiltro={setFiltro}/>
                    <Ordenador ordenador={ordenador} setOrdenador={setOrdenador}/>
                </div>
                <Itens busca={busca} filtro={filtro} ordenador={ordenador} />
            </section>
        </main>
    )
}
