import React, { useState } from 'react';

const CepApi = () => {
  const [cep, setCep] = useState('');
  const [cepData, setCepData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearchCep = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (response.ok) {
        setCepData(data);
      } else {
        setError('CEP não encontrado');
      }
    } catch (error) {
      setError('Erro ao buscar CEP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={(e) => setCep(e.target.value)}
      />
      <button onClick={handleSearchCep} disabled={loading}>
        {loading ? 'Carregando...' : 'Buscar CEP'}
      </button>
      {error && <p>{error}</p>}
      {cepData && (
        <div>
          <p>CEP: {cepData.cep}</p>
          <p>Logradouro: {cepData.logradouro}</p>
          <p>Bairro: {cepData.bairro}</p>
          <p>Cidade: {cepData.localidade}</p>
          <p>Estado: {cepData.uf}</p>
        </div>
      )}
    </div>
  );
};

export default CepApi;