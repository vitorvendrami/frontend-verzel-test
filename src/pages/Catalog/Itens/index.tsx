import cars_default from './itens.json';
import Item from './Item'
import {useEffect, useState} from "react";

interface Props {
    busca: string;
    filtro: number | null;
    ordenador: string;
}
export default function Itens(props: Props){
    const [list, setList] = useState(cars_default);

    function getList() {
        return fetch('http://3.143.227.14:5000/cars')
            .then(data => data.json())
    }

    useEffect(() => {
        let mounted = true;
        getList()
            .then(items => {
                console.log(items)
                if(mounted) {
                    setList(items)
                }
            });
    }, [])

    const {busca, filtro, ordenador} = props;

    function search_by_title(title: string){
        const regex = new RegExp(busca, 'i');
        return regex.test(title);
    }


    function testaFiltro(id: number) {
        if(filtro !== null) return filtro === id;
        return true;
    }

    function ordenar(novaLista: typeof cars_default) {
        switch(ordenador) {
            case 'higher_price':
                return novaLista.sort((a,b) => a.price > b.price ? 1 : -1);
            case 'lower_price':
                return novaLista.sort((a,b) => a.price < b.price ? 1 : -1);
            case 'oldest':
                return novaLista.sort((a,b) => a.year > b.year ? 1 : -1);
            case 'newest':
                return novaLista.sort((a,b) => a.year < b.year ? 1 : -1);
            default:
                return novaLista;
        }
    }

    useEffect(() => {
        const novaLista = cars_default.filter(item => search_by_title(item.title) && testaFiltro(item.category.id));
        setList(ordenar(novaLista));
    },[busca, filtro, ordenador])


    return (
        <div className="row row-cols-1 row-cols-md-4 ">
            {list.map(item => (
                <Item key={item.id} {...item} />
            ))}
        </div>
    )
}
