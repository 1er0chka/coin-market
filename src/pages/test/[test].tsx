import { useRouter } from 'next/router';
import {GetStaticPaths, GetStaticProps} from "next";

type CurrencyCoinProps = {
    slug: string;
}


const CurrencyCoinPage = ({ slug }: CurrencyCoinProps) => {
    const router = useRouter();

    // Если страница находится в состоянии загрузки из-за fallback, вы можете показать загрузчик или плейсхолдер.
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return <div>{slug}</div>;
}
// Ваш код компонента...

export default CurrencyCoinPage

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], // Пустой массив, так как изначально мы не знаем ни одного маршрута.
        fallback: true
    };
}

export const getStaticProps: GetStaticProps<CurrencyCoinProps> = async (context) => {
    const slug = context.params!.test as string;

    // ... здесь можете получать данные на основе slug ...

    return {
        props: {
            slug
        }
    }
}
