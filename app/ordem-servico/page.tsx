'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

export default function OrdemServicoPage() {
  const [formData, setFormData] = useState({
    cliente: '',
    cnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    numeroOS: '',
    dataInicio: '',
    dataTermino: '',
    servicos: '',
    valor: '',
    formaPagamento: '',
    observacoes: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.print()
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <span className={styles.backIcon}>←</span>
          <span>Voltar</span>
        </Link>
        <div className={styles.titleContainer}>
          <span className={styles.titleIcon}>📋</span>
          <h1 className={styles.title}>Gerador de Ordem de Serviço</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>👤</span>
            Dados do Cliente
          </h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="cliente">Nome/Razão Social *</label>
              <input
                type="text"
                id="cliente"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cnpj">CNPJ *</label>
              <input
                type="text"
                id="cnpj"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cidade">Cidade</label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="estado">Estado</label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📅</span>
            Dados da Ordem de Serviço
          </h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="numeroOS">Número da OS *</label>
              <input
                type="text"
                id="numeroOS"
                name="numeroOS"
                value={formData.numeroOS}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="dataInicio">Data de Início</label>
              <input
                type="date"
                id="dataInicio"
                name="dataInicio"
                value={formData.dataInicio}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="dataTermino">Data de Término Prevista</label>
              <input
                type="date"
                id="dataTermino"
                name="dataTermino"
                value={formData.dataTermino}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🔧</span>
            Serviços
          </h2>
          <div className={styles.formGroup}>
            <label htmlFor="servicos">Descrição dos Serviços *</label>
            <textarea
              id="servicos"
              name="servicos"
              value={formData.servicos}
              onChange={handleChange}
              rows={6}
              required
              placeholder="Descreva os serviços a serem executados..."
            />
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="valor">Valor Total *</label>
              <input
                type="text"
                id="valor"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                required
                placeholder="R$ 0,00"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="formaPagamento">Forma de Pagamento</label>
              <select
                id="formaPagamento"
                name="formaPagamento"
                value={formData.formaPagamento}
                onChange={handleChange}
              >
                <option value="">Selecione...</option>
                <option value="À vista">À vista</option>
                <option value="Parcelado">Parcelado</option>
                <option value="Boleto">Boleto</option>
                <option value="Transferência">Transferência</option>
                <option value="PIX">PIX</option>
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows={4}
              placeholder="Observações adicionais..."
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            <span className={styles.buttonIcon}>🖨️</span>
            <span className={styles.buttonText}>Gerar Ordem de Serviço</span>
            <span className={styles.buttonArrow}>→</span>
          </button>
        </div>
      </form>

      <div className={styles.printView}>
        <div className={styles.osDocument}>
          <h1>ORDEM DE SERVIÇO</h1>
          <div className={styles.documentHeader}>
            <p><strong>Nº OS:</strong> {formData.numeroOS || '_________________'}</p>
            <p><strong>Data:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
          <div className={styles.documentSection}>
            <h2>Cliente:</h2>
            <p><strong>{formData.cliente || '_________________'}</strong></p>
            <p>CNPJ: {formData.cnpj || '_________________'}</p>
            {formData.endereco && <p>Endereço: {formData.endereco}</p>}
            {formData.cidade && <p>{formData.cidade}{formData.estado && ` - ${formData.estado}`}{formData.cep && ` - CEP: ${formData.cep}`}</p>}
            {formData.telefone && <p>Telefone: {formData.telefone}</p>}
            {formData.email && <p>E-mail: {formData.email}</p>}
          </div>
          <div className={styles.documentSection}>
            <h2>Datas:</h2>
            {formData.dataInicio && <p><strong>Início:</strong> {new Date(formData.dataInicio).toLocaleDateString('pt-BR')}</p>}
            {formData.dataTermino && <p><strong>Término Previsto:</strong> {new Date(formData.dataTermino).toLocaleDateString('pt-BR')}</p>}
          </div>
          <div className={styles.documentSection}>
            <h2>Serviços a Executar:</h2>
            <p>{formData.servicos || '_________________'}</p>
          </div>
          <div className={styles.documentSection}>
            <h2>Valores e Pagamento:</h2>
            <p><strong>Valor Total:</strong> {formData.valor || 'R$ 0,00'}</p>
            {formData.formaPagamento && <p><strong>Forma de Pagamento:</strong> {formData.formaPagamento}</p>}
          </div>
          {formData.observacoes && (
            <div className={styles.documentSection}>
              <h2>Observações:</h2>
              <p>{formData.observacoes}</p>
            </div>
          )}
          <div className={styles.documentFooter}>
            <div className={styles.signatureBox}>
              <p>Assinatura do Cliente:</p>
              <div className={styles.signatureLine}></div>
            </div>
            <div className={styles.signatureBox}>
              <p>Assinatura do Prestador:</p>
              <div className={styles.signatureLine}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

