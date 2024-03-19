import {
    Button,
    Flex,
    Timeline,
    Text,
    Alert,
    Group,
    NumberInput,
    SegmentedControl,
    Title,
} from "@mantine/core";
import { IconAdjustments, IconCoins, IconPrinter, IconUpload } from "@tabler/icons-react";
import { localization } from "/src/constants/localization.ts";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useRef } from "react";
import { useToggle } from "@mantine/hooks";

enum PrintPageStages {
    UPLOAD, ADJUST, PAY, DONE
}

const PrintPageStagesArray = Object.keys(PrintPageStages).slice(0, Object.keys(PrintPageStages).length / 2).map(parseFloat)

const ICON_BULLET_SIZE = 18

export const PrintPage = () => {
    const [value, toggle] = useToggle<number>(PrintPageStagesArray);

    const openRef = useRef<() => void>(null)

    const stages = {
        [PrintPageStages.UPLOAD]: {
            label: localization.printPage.stepper.firstStep,
            description: 'Загрузите файл в формате .pdf',
            icon: <IconUpload size={ICON_BULLET_SIZE}/>,
            flexGap: 'sm',
            content: <>
                <Dropzone
                    onDrop={(files) => console.log('accepted files', files)}
                    onReject={(files) => console.log('rejected files', files)}
                    openRef={openRef}
                    activateOnClick={false}
                    accept={[MIME_TYPES.pdf]}
                >
                    <Group justify="center">
                        <Button onClick={() => openRef.current?.()} style={{pointerEvents: 'all'}}>
                            Выбрать файл
                        </Button>
                    </Group>
                </Dropzone>

                <Alert variant="outline" color="orange" title="Лучше используйте файл в формате pdf">
                    <Text>
                        Так точно не возникнут проблемы при конвертации
                    </Text>
                    <Text>
                        Узнайте как сохранять в PDF в Microsoft Office
                    </Text>
                </Alert>

                <Button onClick={() => toggle()}>Далее</Button>
            </>
        },
        [PrintPageStages.ADJUST]: {
            label: 'Проверьте файл и установите параметры',
            description: 'Настройте параметры печати как вы обычно это делате',
            icon: <IconAdjustments size={ICON_BULLET_SIZE}/>,
            flexGap: 'lg',
            content: <>
                <Flex direction="column" gap="sm">
                    <NumberInput
                        label="Количество копий"
                        placeholder="1"
                    />
                    <SegmentedControl data={['Одностороняя', 'Двустороняя']}/>
                </Flex>

                <Flex direction="column" gap="xs">
                    <div>
                        <Text>Тариф: 5 ₽ / стр.</Text>
                        <Text>Всего страниц к печати: 10</Text>
                    </div>

                    <div>
                        <Text>Итого к оплате:</Text>
                        <Title order={1}>120 ₽</Title>
                    </div>
                </Flex>

                <Flex gap="sm">
                    <Button variant="outline">Назад</Button>
                    <Button onClick={() => toggle()} fullWidth>Далее</Button>
                </Flex>
            </>
        },
        [PrintPageStages.PAY]: {
            label: 'Оплатите',
            description: 'Через СБП или картой',
            icon: <IconCoins size={ICON_BULLET_SIZE}/>,
            flexGap: 'sm',
            content: <>
                <div>
                    <Text>Итого к оплате:</Text>
                    <Title order={1}>120 ₽</Title>
                </div>

                <Button onClick={() => toggle()}>СБП [без комиссии]</Button>
                <Flex gap="sm">
                    <Button variant="outline">Назад</Button>
                    <Button fullWidth variant="outline">Карта [комиссия 4₽]</Button>
                </Flex>
            </>
        },
        [PrintPageStages.DONE]: {
            label: 'Заберите документы',
            description: 'В автомате',
            icon: <IconPrinter size={ICON_BULLET_SIZE}/>,
            flexGap: 'sm',
            content: <>
                <Text c="dimmed" size="sm">Спасибо, что воспользовались сервисом</Text>
                <Button onClick={() => toggle()}>Напечатать ещё</Button>
                <Button variant="light">Что-то пошло не так</Button>
            </>
        }
    }

    return <Flex
        align="center"
        direction="column"
    >
        <Timeline active={value} bulletSize={32} lineWidth={2}>
            {Object.values(stages).map(({label, description, content, flexGap, icon}, index) => (
                <Timeline.Item key={label} bullet={icon} title={label}>
                    <Flex miw={'30rem'} maw={'500rem'} direction="column" gap={flexGap}>
                        {description && <Text c="dimmed" size="sm">{description}</Text>}
                        {value === index && content}
                    </Flex>
                </Timeline.Item>
            ))}
        </Timeline>
    </Flex>

}