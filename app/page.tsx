import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <div className={styles.logoWrapper}>
            <Image
              src="/images/logo-ligare-10anos.png"
              alt="Logo Ligare 10 Anos"
              width={400}
              height={200}
              priority
              className={styles.logo}
              unoptimized
            />
          </div>
          <h1 className={styles.welcomeTitle}>Sistema de Gestão de Documentos</h1>
          <p className={styles.welcomeSubtitle}>Gere propostas e ordens de serviço de forma rápida e profissional</p>
        </div>
        
        <div className={styles.buttonsContainer}>
          <Link href="/proposta" className={`${styles.button} ${styles.buttonPrimary}`}>
            <div className={styles.buttonIcon}>📄</div>
            <div className={styles.buttonContent}>
              <span className={styles.buttonTitle}>Gerador de Proposta</span>
              <span className={styles.buttonDescription}>Crie propostas comerciais personalizadas</span>
            </div>
            <div className={styles.buttonArrow}>→</div>
          </Link>
          
          <Link href="/ordem-servico" className={`${styles.button} ${styles.buttonSecondary}`}>
            <div className={styles.buttonIcon}>📋</div>
            <div className={styles.buttonContent}>
              <span className={styles.buttonTitle}>Gerador de Ordem de Serviço</span>
              <span className={styles.buttonDescription}>Crie ordens de serviço detalhadas</span>
            </div>
            <div className={styles.buttonArrow}>→</div>
          </Link>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⚡</span>
            <span className={styles.featureText}>Rápido e Fácil</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>💼</span>
            <span className={styles.featureText}>Profissional</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎯</span>
            <span className={styles.featureText}>Personalizado</span>
          </div>
        </div>
      </div>
    </main>
  )
}

