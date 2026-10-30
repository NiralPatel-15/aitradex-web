import Image from "next/image";
import styles from "./Mobile.module.css";

import {
  Smartphone,
  Download,
  ShieldCheck,
  ChartNoAxesCombined,
} from "lucide-react";

export default function Mobile() {
  return (
    <section className={styles.mobile}>
      <div className={styles.container}>
        {/* Left */}

        <div className={styles.content}>
          <span className={styles.badge}>Mobile Experience</span>

          <h2>AITradeX Mobile App</h2>

          <p>
            Invest, monitor your portfolio, chat with AI, and stay updated with
            live markets anytime, anywhere.
          </p>

          <ul>
            <li>
              <ChartNoAxesCombined size={18} />
              Live Portfolio Tracking
            </li>

            <li>
              <ShieldCheck size={18} />
              Secure Login & Authentication
            </li>

            <li>
              <Smartphone size={18} />
              Built with Flutter
            </li>
          </ul>

          <div className={styles.buttons}>
            <button>
              <Download size={18} />
              Android
            </button>

            <button className={styles.secondary}>
              <Download size={18} />
              iOS
            </button>
          </div>
        </div>

        {/* Right */}

        <div className={styles.phone}>
          <Image
            src="/images/mobile/dashboard.png"
            alt="AITradeX App"
            fill
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
