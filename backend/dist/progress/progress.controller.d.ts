import { ProgressService } from './progress.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    submitAnswer(req: any, submitAnswerDto: SubmitAnswerDto): Promise<any>;
}
