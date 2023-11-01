import styles from "./page.module.scss"
import Table from "@/app/components/table/Table";

export default function Home() {
    return (
        <main>
            <div className={styles.content}>
                <div className={styles.title}>Today's Cryptocurrency Prices</div>
                <Table/>
            </div>
        </main>
    )
}
