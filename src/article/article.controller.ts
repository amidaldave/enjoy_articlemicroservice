import { Controller, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ArticleService } from './article.service';
import { MessagePattern } from '@nestjs/microservices';
import { ArticleDto } from '../dtos/article.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ArticleEntity } from '../entities/article.entity';

@Controller('article')
export class ArticleController {

    constructor(
        private readonly articleService: ArticleService,
    ){}

    @MessagePattern({cmd :'getArticle'})    
    findAllArticle(data: any[]){
        return this.articleService.findAllArticle(data[0], data[1]);
    }

    @MessagePattern({cmd :'addArticle'})
     @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: ArticleEntity,
      }) 
    async createArticle(articleDto: ArticleDto){
        const article = await this.articleService.createArticle(articleDto);
        if(article)
            return article;
        throw new HttpException('Article not created',HttpStatus.NOT_MODIFIED); 
    }

    @MessagePattern({cmd :'getArticleById'})
    async findOneArticle(articleId: string){
        Logger.log('L"article dont l"id est '+articleId,'ArticleController');
        const article = await this.articleService.findOneArticle(articleId);
        if(article)
            return article;
        throw new HttpException('Article not found',HttpStatus.NOT_FOUND);        
    }

    @MessagePattern({cmd :'updateArticle'})
    async updateArticle(articleId: string, articleDto: ArticleDto){
        const article = await this.articleService.findOneArticle(articleId);
        if(article)
            return await this.articleService.updateArticle(articleId,articleDto);
        throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({cmd :'deleteArticle'})
    async removeArticle(articleId: string){
        const article = await this.articleService.findOneArticle(articleId);
        if(article)
            return await this.articleService.removeArticle(articleId);
         throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateArticleTag' })
    async TagArticle(data: any[]){
        const article = await this.articleService.TagArticle(data[0], data[1]);        
        if(article)
            return article;
        throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateArticleLabel' })
    async LabelArticle(data: any[]){
        const article = await this.articleService.LabelArticle(data[0], data[1]);        
        if(article)
            return article;
        throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }

    @MessagePattern({ cmd: 'updateArticleAuthor' })
    async RedactionArticle(data: any[]){
        const article = await this.articleService.RedactionArticle(data[0], data[1]);        
        if(article)
            return article;
        throw new HttpException('Article not modified',HttpStatus.NOT_FOUND);
    }
}
