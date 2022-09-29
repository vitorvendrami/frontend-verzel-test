import React from "react";

interface Props {
    busca: string;
    setBusca: React.Dispatch<React.SetStateAction<string>>;
}

export default function Buscador({ busca, setBusca }: Props) {
    return (
        <div className="input-group">
                <input
                    className="form-control"
                    value={busca}
                    onChange={(evento) => setBusca(evento.target.value)}
                    placeholder="Busque por marca, modelo, ano, cor ..."
                />
        </div>

    );
}
