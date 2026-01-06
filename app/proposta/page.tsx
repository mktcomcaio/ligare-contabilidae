'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './page.module.css'

// Função para converter número simples para extenso (até 99)
const converterNumeroSimples = (num: number): string => {
  const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove']
  const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
  const especiais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove']
  
  if (num === 0) return 'zero'
  if (num < 10) return unidades[num]
  if (num < 20) return especiais[num - 10]
  if (num < 100) {
    const dezena = Math.floor(num / 10)
    const unidade = num % 10
    if (unidade === 0) return dezenas[dezena]
    return `${dezenas[dezena]} e ${unidades[unidade]}`
  }
  return num.toString()
}

// Função para converter número para extenso (valores monetários)
const converterParaExtenso = (valor: number): string => {
    // Implementação básica - pode ser melhorada
    const unidades = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove']
    const dezenas = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
    const especiais = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove']
    
    const reais = Math.floor(valor)
    const centavos = Math.round((valor - reais) * 100)
    
    let texto = ''
    
    if (reais === 0) {
      texto = 'zero'
    } else if (reais < 10) {
      texto = unidades[reais]
    } else if (reais < 20) {
      texto = especiais[reais - 10]
    } else if (reais < 100) {
      const dezena = Math.floor(reais / 10)
      const unidade = reais % 10
      texto = dezenas[dezena]
      if (unidade > 0) {
        texto += ' e ' + unidades[unidade]
      }
    } else {
      texto = reais.toString()
    }
    
    texto += ' reais'
    if (centavos > 0) {
      if (centavos < 10) {
        texto += ' e ' + unidades[centavos] + ' centavos'
      } else if (centavos < 20) {
        texto += ' e ' + especiais[centavos - 10] + ' centavos'
      } else {
        const dezenaCent = Math.floor(centavos / 10)
        const unidadeCent = centavos % 10
        texto += ' e ' + dezenas[dezenaCent]
        if (unidadeCent > 0) {
          texto += ' e ' + unidades[unidadeCent]
        }
        texto += ' centavos'
      }
    }
    
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}

export default function PropostaPage() {
  const [formData, setFormData] = useState({
    // Página 1 - Dados do Cliente
    nomeCliente: '',
    cnpjCliente: '',
    referenciaServico: '',
    // Página 2 - Serviços e Pagamento
    prazoConclusao: '30',
    descricaoServico: '',
    quantidade: '1',
    valorUnitario: '0,00',
    numeroParcelas: '1',
    vencimentoPrimeiraParcela: '',
    // Página 3 - Validade e Honorários
    validadeProposta: '15',
    honorariosMensais: '0,00',
    honorariosPorExtenso: '',
    regimeTributario: '',
    diaVencimentoMensal: '10',
    // Campos adicionais para o layout
    objetivoPrincipal: '',
    definicaoServicos: '',
    exclusoes: ''
  })

  // Função para converter número para extenso
  useEffect(() => {
    const valor = parseFloat(formData.honorariosMensais.replace(',', '.'))
    if (!isNaN(valor) && valor > 0) {
      const extenso = converterParaExtenso(valor)
      setFormData(prev => ({
        ...prev,
        honorariosPorExtenso: extenso
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        honorariosPorExtenso: ''
      }))
    }
  }, [formData.honorariosMensais])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Formatação automática para valores monetários
    if (name === 'valorUnitario' || name === 'honorariosMensais') {
      // Remove tudo que não é número
      const apenasNumeros = value.replace(/\D/g, '')
      if (apenasNumeros === '') {
        setFormData(prev => ({
          ...prev,
          [name]: '0,00'
        }))
        return
      }
      // Converte para formato monetário (centavos)
      const valorCentavos = parseInt(apenasNumeros)
      const reais = Math.floor(valorCentavos / 100)
      const centavos = valorCentavos % 100
      const valorFormatado = `${reais},${centavos.toString().padStart(2, '0')}`
      
      setFormData(prev => ({
        ...prev,
        [name]: valorFormatado
      }))
      return
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const formatarData = (data: string): string => {
    if (!data) return ''
    // Converte de YYYY-MM-DD para DD/MM/YYYY
    const partes = data.split('-')
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`
    }
    return data
  }

  const formatarDataPorExtenso = (data: string): string => {
    if (!data) {
      const hoje = new Date()
      const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
      return `Americana (SP), ${hoje.getDate()} de ${meses[hoje.getMonth()]} de ${hoje.getFullYear()}.`
    }
    const partes = data.split('-')
    if (partes.length === 3) {
      const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
                    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
      const dia = parseInt(partes[2])
      const mes = parseInt(partes[1]) - 1
      const ano = parseInt(partes[0])
      return `Americana (SP), ${dia} de ${meses[mes]} de ${ano}.`
    }
    return `Americana (SP), ${data}.`
  }

  const calcularValorTotal = (): number => {
    const quantidade = parseFloat(formData.quantidade) || 0
    const valorUnit = parseFloat(formData.valorUnitario.replace(',', '.')) || 0
    return quantidade * valorUnit
  }

  const formatarMoeda = (valor: number): string => {
    return `R$ ${valor.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
  }

  const calcularParcelas = (): Array<{numero: number, vencimento: string, valor: number}> => {
    const total = calcularValorTotal()
    const numParcelas = parseInt(formData.numeroParcelas) || 1
    const valorParcela = total / numParcelas
    const parcelas: Array<{numero: number, vencimento: string, valor: number}> = []
    
    if (formData.vencimentoPrimeiraParcela) {
      const [ano, mes, dia] = formData.vencimentoPrimeiraParcela.split('-').map(Number)
      
      // Calcular todas as parcelas com intervalo de 1 mês entre elas
      for (let i = 0; i < numParcelas; i++) {
        const dataVencimento = new Date(ano, mes - 1 + i, dia)
        parcelas.push({
          numero: i + 1,
          vencimento: formatarData(dataVencimento.toISOString().split('T')[0]),
          valor: valorParcela
        })
      }
    } else {
      // Se não houver data, criar parcelas sem data
      for (let i = 0; i < numParcelas; i++) {
        parcelas.push({
          numero: i + 1,
          vencimento: '_________________',
          valor: valorParcela
        })
      }
    }
    
    return parcelas
  }

  // Função para obter apenas a primeira parcela (para exibição na tabela principal)
  const obterPrimeiraParcela = () => {
    const parcelas = calcularParcelas()
    return parcelas.length > 0 ? parcelas[0] : null
  }

  const formatarPrazo = (dias: string): string => {
    const numDias = parseInt(dias) || 0
    const diasPorExtenso = converterNumeroSimples(numDias)
    return `${numDias} (${diasPorExtenso})`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.print()
  }

  // Gerar data padrão para vencimento (30 dias a partir de hoje)
  useEffect(() => {
    if (!formData.vencimentoPrimeiraParcela) {
      const hoje = new Date()
      hoje.setDate(hoje.getDate() + 30)
      const dataFormatada = hoje.toISOString().split('T')[0]
      setFormData(prev => ({
        ...prev,
        vencimentoPrimeiraParcela: dataFormatada
      }))
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <span className={styles.backIcon}>←</span>
          <span>Voltar</span>
        </Link>
        <div className={styles.titleContainer}>
          <span className={styles.titleIcon}>📄</span>
          <h1 className={styles.title}>Gerador de Proposta Comercial</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Página 1 - Dados do Cliente */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>👤</span>
            Página 1 - Dados do Cliente
          </h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="nomeCliente">Nome do Cliente <span className={styles.required}>*</span></label>
              <input
                type="text"
                id="nomeCliente"
                name="nomeCliente"
                value={formData.nomeCliente}
                onChange={handleChange}
                placeholder="Nome da empresa ou pessoa"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cnpjCliente">CNPJ <span className={styles.required}>*</span></label>
              <input
                type="text"
                id="cnpjCliente"
                name="cnpjCliente"
                value={formData.cnpjCliente}
                onChange={handleChange}
                placeholder="00.000.000/0001-00"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="referenciaServico">Referência do Serviço <span className={styles.required}>*</span></label>
              <input
                type="text"
                id="referenciaServico"
                name="referenciaServico"
                value={formData.referenciaServico}
                onChange={handleChange}
                placeholder="Ex: Abertura de Empresa"
                required
              />
            </div>
          </div>
        </div>

        {/* Página 2 - Serviços e Pagamento */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>💼</span>
            Página 2 - Serviços e Pagamento
          </h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="prazoConclusao">Prazo de Conclusão (dias úteis) <span className={styles.required}>*</span></label>
              <input
                type="number"
                id="prazoConclusao"
                name="prazoConclusao"
                value={formData.prazoConclusao}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="quantidade">Quantidade <span className={styles.required}>*</span></label>
              <input
                type="number"
                id="quantidade"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="valorUnitario">Valor Unitário (R$) <span className={styles.required}>*</span></label>
              <input
                type="text"
                id="valorUnitario"
                name="valorUnitario"
                value={formData.valorUnitario}
                onChange={handleChange}
                placeholder="0,00"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="numeroParcelas">Número de Parcelas <span className={styles.required}>*</span></label>
              <select
                id="numeroParcelas"
                name="numeroParcelas"
                value={formData.numeroParcelas}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                  <option key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Parcela' : 'Parcelas'}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="vencimentoPrimeiraParcela">Vencimento 1ª Parcela <span className={styles.required}>*</span></label>
              <input
                type="date"
                id="vencimentoPrimeiraParcela"
                name="vencimentoPrimeiraParcela"
                value={formData.vencimentoPrimeiraParcela}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="descricaoServico">Descrição do Serviço <span className={styles.required}>*</span></label>
            <input
              type="text"
              id="descricaoServico"
              name="descricaoServico"
              value={formData.descricaoServico}
              onChange={handleChange}
              placeholder="Ex: Abertura de Empresa + Taxa da OAB"
              required
            />
          </div>
        </div>

        {/* Página 3 - Validade e Honorários */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>💰</span>
            Página 3 - Validade e Honorários
          </h2>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="validadeProposta">Validade da Proposta (dias) <span className={styles.required}>*</span></label>
              <input
                type="number"
                id="validadeProposta"
                name="validadeProposta"
                value={formData.validadeProposta}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="honorariosMensais">Honorários Mensais (R$) <span className={styles.required}>*</span></label>
              <input
                type="text"
                id="honorariosMensais"
                name="honorariosMensais"
                value={formData.honorariosMensais}
                onChange={handleChange}
                placeholder="0,00"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="honorariosPorExtenso">Honorários por Extenso</label>
              <input
                type="text"
                id="honorariosPorExtenso"
                name="honorariosPorExtenso"
                value={formData.honorariosPorExtenso}
                disabled
                placeholder="Gerado automaticamente"
                className={styles.disabledInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="regimeTributario">Regime Tributário <span className={styles.required}>*</span></label>
              <input
                type="text"
                id="regimeTributario"
                name="regimeTributario"
                value={formData.regimeTributario}
                onChange={handleChange}
                placeholder="Ex: Simples Nacional"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="diaVencimentoMensal">Dia de Vencimento Mensal <span className={styles.required}>*</span></label>
              <input
                type="number"
                id="diaVencimentoMensal"
                name="diaVencimentoMensal"
                value={formData.diaVencimentoMensal}
                onChange={handleChange}
                min="1"
                max="31"
                required
              />
            </div>
          </div>
        </div>

        {/* Campos Adicionais para Conteúdo da Proposta */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📝</span>
            Conteúdo da Proposta
          </h2>
          <div className={styles.formGroup}>
            <label htmlFor="objetivoPrincipal">Objetivo Principal <span className={styles.required}>*</span></label>
            <textarea
              id="objetivoPrincipal"
              name="objetivoPrincipal"
              value={formData.objetivoPrincipal}
              onChange={handleChange}
              rows={3}
              placeholder="Ex: Prestar o serviço de assessoria contábil na área de LEGALIZAÇÃO, realizando especialmente a Transformação de MEI para LTDA com a regularização do CNPJ."
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="definicaoServicos">Definição dos Serviços a serem Executados <span className={styles.required}>*</span></label>
            <textarea
              id="definicaoServicos"
              name="definicaoServicos"
              value={formData.definicaoServicos}
              onChange={handleChange}
              rows={4}
              placeholder="Ex: Entrar com o processo de ARQUIVAMENTO DE TRANSFORMAÇÃO DE EMPRESA, realizando seu devido acompanhamento junto a Junta Comercial do Estado de São Paulo..."
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="exclusoes">Exclusões (O que não está incluído) <span className={styles.required}>*</span></label>
            <textarea
              id="exclusoes"
              name="exclusoes"
              value={formData.exclusoes}
              onChange={handleChange}
              rows={3}
              placeholder="Ex: Não compreende essa proposta, a emissão de licenças sanitária, bombeiros, ambiental..."
              required
            />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>
            <span className={styles.buttonIcon}>🖨️</span>
            <span className={styles.buttonText}>Gerar Proposta</span>
            <span className={styles.buttonArrow}>→</span>
          </button>
        </div>
      </form>

      <div className={styles.printView}>
        {/* Página 1 */}
        <div className={styles.page}>
          <div className={styles.printHeader}>
            <img src="/images/logo-ligare-10anos.png" alt="Grupo Ligare" className={styles.logo} />
            <h1>PROPOSTA COMERCIAL</h1>
          </div>
          
          <div className={styles.dataLocal}>
            {formatarDataPorExtenso('')}
          </div>
          
          <div className={styles.saudacao}>
            Prezada.
          </div>
          
          <div className={styles.refLinha}>
            Proposta Ref. <strong>{formData.referenciaServico || '_________________'}</strong>
          </div>
          
          <div className={styles.empresaInfo}>
            <strong>Empresa: {formData.nomeCliente || '_________________'}</strong><br />
            <strong>CNPJ: {formData.cnpjCliente || '00.000.000/0001-00'}</strong>
          </div>
          
          <div className={styles.introducao}>
            Em atendimento a solicitação, apresentamos nossa proposta para prestação de Serviços Profissionais Contábeis na Abertura da sua empresa.
            <br /><br />
            O <strong><em>GRUPO LIGARE</em></strong> além de prestar serviços de assessoria contábil completa e consultiva para o seu negócio, sem burocracia, atuando no estado São Paulo desde 2008 e em 14 estados e inclusive no Exterior. Com nossa vasta experiência na área Contábil, Fiscal, Trabalhista, Tributária e Financeira, não existe problema que não possamos resolver.
            <br /><br />
            Atendemos hoje, todos os seguimentos de empresas, portes e regimes de tributação, sendo especialista no regime do <strong><em>LUCRO REAL</em></strong>. E dentro os nosso cases de sucesso, atuamos fortemente com o planejamento tributário, afins de reduzir a carga tributária de impostos de nossos clientes. Porque o que realmente importa é o <strong><em>LUCRO</em></strong> do seu negócio.
            <br /><br />
            Nosso trabalho visa agregar valores a sua empresa com o intuito de alcançar resultados notáveis com acesso a novos mercados promissores e ampliação da sua presença no mercado, fruto de uma assessoria ágil e produtiva com colaboradores treinados e capacitados.
            <br /><br />
            Aproveitamos a oportunidade para nos colocar à inteira disposição para quaisquer esclarecimentos adicionais eventualmente necessários.
          </div>
        </div>

        {/* Página 2 */}
        <div className={styles.page}>
          <div className={styles.printHeader}>
            <img src="/images/logo-ligare-10anos.png" alt="Grupo Ligare" className={styles.logo} />
            <h1>PROPOSTA COMERCIAL</h1>
          </div>
          
          <div className={styles.section}>
            <div className={styles.sectionTitle}>1. OBJETIVO</div>
            <div className={styles.sectionContent}>
              {formData.objetivoPrincipal ? (
                <span dangerouslySetInnerHTML={{ __html: formData.objetivoPrincipal }} />
              ) : (
                <span>Prestar o serviço de assessoria contábil na área de <span className={styles.highlight}>LEGALIZAÇÃO</span>, realizando especialmente a Transformação de MEI para LTDA com a regularização do CNPJ.</span>
              )}
            </div>
          </div>
          
          <div className={styles.section}>
            <div className={styles.sectionTitle}>2. DEFINIÇÃO DOS SERVIÇOS A SEREM EXECUTADOS</div>
            <div className={styles.sectionContent}>
              {formData.definicaoServicos ? (
                <span dangerouslySetInnerHTML={{ __html: formData.definicaoServicos }} />
              ) : (
                <span>Entrar com o processo de <span className={styles.highlight}>ARQUIVAMENTO DE TRANSFORMAÇÃO DE EMPRESA</span>, realizando seu devido acompanhamento junto a Junta Comercial do Estado de São Paulo, Receita Federal do Brasil - RFB, Secretaria da Fazenda e Prefeitura.</span>
              )}
              <br /><br />
              {formData.exclusoes ? (
                <span>{formData.exclusoes}</span>
              ) : (
                <span>Não compreende essa proposta, a emissão de licenças sanitária, bombeiros, ambiental, registro a órgãos regulamentadores ou de classe. Caso seja necessário, por favor, solicitar uma proposta comercial.</span>
              )}
            </div>
          </div>
          
          <div className={styles.section}>
            <div className={styles.sectionTitle}>3. PRAZOS DE CONCLUSÃO E ENTREGA DOS SERVIÇOS</div>
            <div className={styles.sectionContent}>
              O prazo estipulado para a conclusão dos serviços será de aproximadamente <strong>{formatarPrazo(formData.prazoConclusao)} dias úteis</strong>, a partir da confirmação do recebimento e retorno da <strong>totalidade</strong> dos documentos, dados e/ou informações necessárias e indispensáveis ao desenvolvimento das atividades, variando apenas de acordo com o tempo de resposta dos órgãos competentes.
            </div>
          </div>
          
          <div className={styles.section}>
            <div className={styles.sectionTitle}>4. INVESTIMENTO E FORMA DE PAGAMENTO</div>
            <div className={styles.sectionContent}>
              A título de investimento pelos serviços contratados, objeto da presente proposta comercial, cobraremos a importância de:
            </div>
            
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Descrição dos Serviços</th>
                  <th>Qtd.</th>
                  <th>Vr. Unitário</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{formData.descricaoServico || '_________________'}</td>
                  <td>{formData.quantidade}</td>
                  <td>{formatarMoeda(parseFloat(formData.valorUnitario.replace(',', '.')))}</td>
                  <td>{formatarMoeda(calcularValorTotal())}</td>
                </tr>
                <tr className={styles.totalRow}>
                  <td colSpan={4} style={{ textAlign: 'right' }}><strong>TOTAL</strong></td>
                  <td><strong>{formatarMoeda(calcularValorTotal())}</strong></td>
                </tr>
              </tbody>
            </table>
            
            <div className={styles.parcelasSection}>
              <div className={styles.sectionContent} style={{ marginBottom: '15px' }}>
                <strong>1ª Parcela:</strong> {obterPrimeiraParcela() ? formatarMoeda(obterPrimeiraParcela()!.valor) : 'R$ 0,00'} - Vencimento: {obterPrimeiraParcela() ? obterPrimeiraParcela()!.vencimento : '_________________'}
              </div>
              
              <table className={styles.parcelasTable}>
                <tbody>
                  <tr>
                    <td><strong>Vencimento(s):</strong></td>
                    <td><strong>{formData.numeroParcelas}</strong></td>
                    <td><strong>Parcelas</strong></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              
              <table className={styles.parcelasTable}>
                <thead>
                  <tr>
                    <th>Parcela</th>
                    <th>Vencimento</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {calcularParcelas().map((parcela) => (
                    <tr key={parcela.numero}>
                      <td>{parcela.numero}ª</td>
                      <td>{parcela.vencimento}</td>
                      <td><strong>{formatarMoeda(parcela.valor)}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className={styles.section}>
            <div className={styles.sectionTitle}>5. OBRIGAÇÕES DA CONTRATADA</div>
            <div className={`${styles.sectionContent} ${styles.obrigacoes}`}>
              Desempenhar os serviços mencionados no objeto da presente proposta com todo zelo, diligência e honestidade, observada a legislação vigente; fornecer à contratante, dentro do horário normal de expediente, todas as informações relativas ao andamento dos serviços ora contratados; respeitar e assegurar o sigilo relativo às informações obtidas durante o seu trabalho não as divulgando, sob qualquer circunstância, para terceiros, sem autorização expressa da contratante, salvo quando, houver obrigação legal de fazê-lo, sendo que o referido sigilo continua mesmo depois de terminados os compromissos contratuais.
            </div>
          </div>
          
          <div className={styles.section}>
            <div className={styles.sectionTitle}>6. OBRIGAÇÕES DA CONTRATANTE</div>
            <div className={`${styles.sectionContent} ${styles.obrigacoes}`}>
              Obriga-se a contratante fornecer à contratada todos os dados, documentos e informações, que se façam necessários ao bom desempenho dos serviços ora contratados, em tempo hábil, sendo que nenhuma responsabilidade caberá a contratada caso recebida intempestivamente, sob pena de revisão dos prazos, custos e condições previstos.
            </div>
          </div>
          
          <div className={styles.section}>
            <div className={styles.sectionTitle}>7. PRAZO DE VALIDADE DA PROPOSTA</div>
            <div className={styles.sectionContent}>
              Esta proposta é válida por {formData.validadeProposta} dias e foi elaborada em consideração a estabilidade da moeda.
            </div>
          </div>
          
          <div className={`${styles.section} ${styles.aceiteSection}`}>
            <div className={styles.sectionTitle}>8. ACEITE DA PROPOSTA</div>
            <div className={styles.assinaturaLinha}>
              <strong>Data: _______/_______/_______</strong>
            </div>
            <div className={styles.assinaturaLinha}>
              <strong>Assinatura:_____________________________________________________</strong>
            </div>
            <div className={styles.obsAceite}>
              <strong>Obs.:</strong> O preenchimento desta poderá ser substituído pela aprovação no corpo do e-mail ou confirmação via WhatsApp.
            </div>
          </div>
          <img src="/images/rodape-ligare.png" alt="Rodapé" className={styles.footerImage} />
        </div>
      </div>
    </div>
  )
}



