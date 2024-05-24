<?php

class BookRecommendations
{
    public function __construct()
    {
        $this->queryLinkList();
    }

    protected function queryLinkList()
    {
        $feedXmlString = file_get_contents('https://www.deutschlandfunknova.de/podcast/das-perfekte-buch-fuer-den-moment');

        $articleLinks = [];
        preg_match_all('/<p>Den Artikel zum Stück findet ihr <a href="(.*)">hier<\/a>\.<\/p>/', $feedXmlString, $articleLinks);
        $articleLinks = array_unique($articleLinks[1]);

        $data = [
            'linkList' => array_slice(array_values($articleLinks), 0, 100),
        ];

        $this->renderJson($data);
    }

    protected function querySingleArticle(string $articleLink)
    {
        if (!str_starts_with($articleLink, 'https://www.deutschlandfunknova.de/')) {
            return;
        }

        $this->extractSingleArticleData(file_get_contents($articleLink));
    }

    protected function extractSingleArticleData(string $articleString)
    {
        $publishingDateMatches = null;
        preg_match('/<time class="timestamp" itemprop="dateCreated" datetime="(.*)">(.*)<\/time>/', $articleString, $publishingDateMatches);
        $publishingDate = preg_replace('/ME(S)?Z/', 'T', $publishingDateMatches[1]);

        $includedLucie = (bool) preg_match('/Luc(i|ie|y)/', $articleString);

        $data = [
            'bookRecommendation' => [
                'publishingDate' => $publishingDate,
                'includesLucie'  => $includedLucie,
            ],
        ];

        $this->renderJson($data);
    }

    protected function renderJson($data)
    {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data);
    }
}

new BookRecommendations();
