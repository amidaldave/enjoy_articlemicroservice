import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '../entities/article.entity';
import { Repository } from 'typeorm';
import { ArticleDto } from '../dtos/article.dto';
import { TagEntity } from '../entities/tag.entity';
import { LabelEntity } from '../entities/label.entity';
import { RedactionEntity } from '../entities/redaction.entity';

@Injectable()
export class ArticleService {

    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,

        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>,

        @InjectRepository(LabelEntity)
        private readonly labelRepository: Repository<LabelEntity>,

        @InjectRepository(RedactionEntity)
        private readonly redactionRepository: Repository<RedactionEntity>,

    ){}

    findAllArticle(limit:number, offset: number){
        return this.articleRepository.find(
            {
                skip: offset,
                take: limit,
                relations:['labels','tags','author']
            });
    }

    async findOneArticle(articleId: string){
        const article = await this.articleRepository.findOne(+articleId,{relations:['labels','tags','author']});
        if(!article)
            return null;
        return article;
    }

    async updateArticle(articleId: string, articleDto: ArticleDto){
        let article = await this.articleRepository.findOne(+articleId,{relations:['labels','tags','author']});
        if(!article)
            return null;
        await this.articleRepository.update(articleId,articleDto);
        article = await this.articleRepository.findOne(+articleId,{relations:['labels','tags','author']});
        return {updatedId: articleId, Article: article};
    }

    async removeArticle(articleId: string){
        const article = await this.articleRepository.findOne(+articleId);
        if(!article)
            return null;
        await this.articleRepository.delete(+articleId);
        return {deletedId: articleId, nbArticles: await this.articleRepository.findAndCount.length};
    }

    async createArticle(articleDto: ArticleDto){        
        const article = await this.articleRepository.save(articleDto);
        return article;
    }

    async TagArticle(articleId: string, tagId: string){
        const article = await this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});        
        if(!article)
            return null;
        const tag = await this.tagRepository.findOne(+tagId);
        if(!tag)
            return null;
        article.tags.push(tag);    
        await this.articleRepository.save(article);    
        return this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});
    }
    async DeleteTagArticle(articleId: string, tagId: string){
        const article = await this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});        
        if(!article)
            return null;        
        if(!article.tags)
            return null;
        for(let i=0;i< article.tags.length;i++){
            if(article.tags[i].idTag === +tagId)
                article.tags.splice(i,1);
        } 
        await this.articleRepository.save(article);    
        return this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});
    }

    async LabelArticle(articleId: string, labelId: string){
        const article = await this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});        
        if(!article)
            return null;
        const label = await this.labelRepository.findOne(+labelId);
        if(!label)
            return null;
        article.labels.push(label);    
        await this.articleRepository.save(article);    
        return this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});
    }

    async DeleteLabelArticle(articleId: string, labelId: string){
        const article = await this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});        
        if(!article)
            return null;        
        if(!article.labels)
            return null;
        for(let i=0;i< article.labels.length;i++){
            if(article.labels[i].idLabel === +labelId)
                article.labels.splice(i,1);
        } 
        await this.articleRepository.save(article);    
        return this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});
    }

    async RedactionArticle(articleId: string, authorId: string){
        const article = await this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});        
        if(!article)
            return null;
        const author = await this.redactionRepository.findOne(+authorId);
        if(!author)
            return null;
        article.author= author;    
        await this.articleRepository.save(article);    
        return this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});
    }

    async DeleteRedactionArticle(articleId: string, authorId: string){
        const article = await this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});        
        if(!article)
            return null;        
        if(!article.author)
            return null;
        if(article.author.idAuthor === +authorId)
            article.author=null;
        await this.articleRepository.save(article);    
        return this.articleRepository.findOne(+articleId, {relations:['labels','tags','author']});
    }

    /* async createArtistArticle(artistArticleDto: ArtistArticleDto){        
        const artistArticle = await this.artistArticleRepository.save(artistArticleDto);
        return artistArticle;
    }

    async deleteArtistArticle(articleId: string, artisteId: string){
        const artistArticle = await this.artistArticleRepository.findOne({where: {articleId:articleId,artisteId:artisteId}});
        if(!artistArticle)
            return null;
        await this.artistArticleRepository
        .createQueryBuilder()
        .delete()
        .from(ArtistArticleEntity)
        .where("articleId = :articleId",{articleId: artistArticle.articleId})
        .andWhere("artisteId = :artisteId",{ artisteId: artistArticle.artisteId})
        .execute();
        return {deletedId: artisteId, nbArtistArticles: await this.artistArticleRepository.findAndCount.length};
    }

    async findArtistArticle(articleId: string, artisteId: string){
        const artistArticle = await this.artistArticleRepository.findOne({where: {articleId:articleId,artisteId:artisteId}});
        if(!artistArticle)
            return null;       
        return artistArticle;
    } */
    
}
