// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cursos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cursos' }),
  schema: z.object({
    nome: z.string(),
    descricao: z.string(),
    nivel: z.string(),
    duracao: z.string(),
    modalidade: z.string(),
    investimento: z.string().optional(),
    objetivos: z.array(z.string()).default([]),
    incluso: z.array(z.string()).default([]),
    publicado: z.boolean().default(false),
    ordem: z.number().default(0),
  }),
});

const instrutores = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/instrutores' }),
  schema: z.object({
    nome: z.string(),
    cargo: z.string(),
    experiencia: z.string(),
    certificacoes: z.string(),
    especialidades: z.string(),
    foto: z.string().optional(),
    ordem: z.number().default(0),
  }),
});

const depoimentos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/depoimentos' }),
  schema: z.object({
    nome: z.string(),
    curso: z.string(),
    texto: z.string(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    pergunta: z.string(),
    ordem: z.number().default(0),
  }),
});

export const collections = { cursos, instrutores, depoimentos, faq };