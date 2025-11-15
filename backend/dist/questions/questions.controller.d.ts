import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    create(createQuestionDto: CreateQuestionDto): Promise<import("./question.interface").Question>;
    findAll(): Promise<import("./question.interface").Question[]>;
    findOne(id: string): Promise<import("./question.interface").Question>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<import("./question.interface").Question>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
